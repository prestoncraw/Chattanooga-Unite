const fs = require("fs");
const { readFile } = require('fs/promises')
const { parse } = require("csv-parse");


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
    "health Care": 8,
    "housing": 9,
    "memorial and burial benefits": 10,
    "other": 11,
    "therapeutic recreation": 12,
    "transportation": 13,
    "utility assistance": 14
}

async function genSql() {
    console.log("beginning generation of schema file...");

    let sql = "";
    const save_path = './utils/out/schema.sql';
    const create_db_sql = "CREATE DATABASE va_resource_center CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;\nUSE va_resource_center;\n";
    const create_tables_sql = await content("./utils/data/Capstone_DB.sql") + "\n";
    const create_counties_sql = await content("./utils/data/counties.sql") + "\n";
    const create_services_sql = await content("./utils/data/services.sql") + "\n";


    sp_count = 0;
    let populate_data_sql = "";

    fs.createReadStream("./utils/data/Service_Provider_Info.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {

            // first check if email is supplied.. 
            if (row[4] == "") {
                console.log(`No email supplied for ${row[0].replace(/(\r\n|\n|\r)/gm, "")} (row ${sp_count+3})! Skipping row.`)
            }



            // console.log(sp_count);
            sp_count++;
        })

    sql = create_db_sql + create_tables_sql + create_counties_sql + create_services_sql;

    fs.writeFile(save_path, sql, err => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`schema file saved to ${save_path}`);
}

genSql();