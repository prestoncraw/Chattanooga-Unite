const fs = require("fs");
const { readFile } = require('fs/promises')
const { parse } = require("csv-parse/sync");

async function content(path) {
    return await readFile(path, 'utf8')
}

county_ids = {
    "bradley": 1,
    "catoosa": 2,
    "dekalb": 3,
    "grundy": 4,
    "bledsoe": 5,
    "dade": 6,
    "hamilton": 7,
    "jackson": 8,
    "marion": 9,
    "mcminn": 10,
    "meigs": 11,
    "murray": 12,
    "polk": 13,
    "rhea": 14,
    "sequatchie": 15,
    "walker": 16,
    "whitfield": 17
}

service_ids = {
    "advocacy": 1,
    "benefits": 2,
    "clothing": 3,
    "dental": 4,
    "education": 5,
    "employment": 6,
    "food": 7,
    "health care": 8,
    "housing": 9,
    "memorial and burial benefits": 10,
    "other": 11,
    "therapeutic recreation": 12,
    "transportation": 13,
    "utility assistance": 14
}

async function genSql() {
    console.log("starting generation of schema file...");

    let sql = "";
    const save_path = './utils/out/schema.sql';
    const rejected_save_path = './utils/out/rejected.csv';

    const create_db_sql = "DROP DATABASE IF EXISTS va_resource_center;\nCREATE DATABASE va_resource_center CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;\nUSE va_resource_center;\n\n";
    const create_tables_sql = await content("./utils/data/Capstone_DB.sql") + "\n";
    const create_counties_sql = await content("./utils/data/counties.sql") + "\n";
    const create_services_sql = await content("./utils/data/services.sql") + "\n";
    const read_csv = await content("./utils/data/Service_Provider_Info.csv");

    const records = parse(read_csv);
    let no_email = [];
    let no_county = [];
    let no_service = [];
    let valid_count = 0;
    let populate_data_sql = "";

    for (let i = 1; i < records.length; i++) {
        // fix weird line breaks from csv
        for (let j = 0; j < records[i].length; j++) {
            records[i][j] = records[i][j].replace(/(\r\n|\n|\r)/gm, "");
        }

        let counties_served = records[i][2].split(",");
        let services_provided = records[i][1].split(",");

        // first check if email is supplied.. 
        if (records[i][4] == "") {
            //console.log(`No email supplied for ${records[i][0]} (row ${i + 2})! Skipping row.`)
            no_email.push(records[i]);
        }
        else if (counties_served == '') {
            no_county.push(records[i]);
        }

        else if (services_provided == '') {
            no_service.push(records[i]);
        }

        else {
            valid_count++;
            // first create the user 
            let user_insert_sql = `INSERT IGNORE INTO \`users\` (\`email\`, \`is_admin\`) VALUES ('${records[i][4]}', 0);\n`;

            // create service_provider
            // note: sometimes the sp name will contain a ' which will mess up the insert statement
            // an escape has manually been added to the 5 that currently exist in the csv
            let sp_insert_sql = `INSERT INTO \`service_providers\` (\`logo_url\`, \`name\`, \`description\`, \`contact_phone_number\`, \`contact_email\`, \`website_url\`, \`address\`, \`login_email\`) \n` +
                `VALUES ('', '${records[i][0]}', '', '${records[i][3]}', '${records[i][4]}', '${records[i][5]}', '${records[i][6]} ${records[i][7]} ${records[i][8]} ${records[i][9]}', '${records[i][4]}');\n`;

            // create county and service associations
            let county_asso_sql = `INSERT INTO \`sp_counties\`\nVALUES`;
            let service_asso_sql = 'INSERT INTO \`sp_services\`\nVALUES';
            //console.log(counties_served);

            for (let j = 0; j < counties_served.length; j++) {
                let county_normalized = counties_served[j].toLowerCase().trim();
                //console.log(valid_count, counties_served[j], county_normalized);
                if (j + 1 == counties_served.length) {
                    county_asso_sql += ` (${valid_count}, ${county_ids[county_normalized]});\n`;
                }
                else {
                    county_asso_sql += ` (${valid_count}, ${county_ids[county_normalized]}),`;
                }
            }

            for (let j = 0; j < services_provided.length; j++) {
                let service_normalized = services_provided[j].toLowerCase().trim();
                //console.log(valid_count, services_provided[j], service_normalized);
                if (j + 1 == services_provided.length) {
                    service_asso_sql += ` (${valid_count}, ${service_ids[service_normalized]});\n`;
                }
                else {
                    service_asso_sql += ` (${valid_count}, ${service_ids[service_normalized]}),`;
                }[i]
            }

            populate_data_sql += user_insert_sql + sp_insert_sql + county_asso_sql + service_asso_sql + "\n";

        }

    }
    console.log(`skipped ${no_email.length} rows due to lack of email address. see ${rejected_save_path}`);
    console.log(`skipped ${no_county.length} rows due to lack of county served. see ${rejected_save_path}`);
    console.log(`skipped ${no_service.length} rows due to lack of service provided. see ${rejected_save_path}`);

    // Save rejected rows to separate csv so the missing information can be gathered for those service providers
    let rejected_csv = 'Reject Reason,Provider,Service,Counties Served,Phone,Email,Website/URL,Street,City,State,Zip\n';
    for (let i = 0; i < no_email.length; i++) {
        rejected_csv+= `no email, ${no_email[i][0]},${no_email[i][1]},${no_email[i][2]},${no_email[i][3]},${no_email[i][4]},${no_email[i][5]},${no_email[i][6]},${no_email[i][7]},${no_email[i][8]},${no_email[i][9]}\n`;
    }
    for (let i = 0; i < no_county.length; i++) {
        rejected_csv+= `no counties served, ${no_county[i][0]},${no_county[i][1]},${no_county[i][2]},${no_county[i][3]},${no_county[i][4]},${no_county[i][5]},${no_county[i][6]},${no_county[i][7]},${no_county[i][8]},${no_county[i][9]}\n`;
    }
    for (let i = 0; i < no_service.length; i++) {
        rejected_csv+= `no services provided, ${no_service[i][0]},${no_service[i][1]},${no_service[i][2]},${no_service[i][3]},${no_service[i][4]},${no_service[i][5]},${no_service[i][6]},${no_service[i][7]},${no_service[i][8]},${no_service[i][9]}\n`;
    }
    fs.writeFile(rejected_save_path, rejected_csv, err => {
        if (err) {
            console.error(err);
        }
    });
    

    sql = create_db_sql + create_tables_sql + create_counties_sql + create_services_sql + populate_data_sql;

    fs.writeFile(save_path, sql, err => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`schema file saved to ${save_path} with ${valid_count} valid service providers`);
}

genSql();
