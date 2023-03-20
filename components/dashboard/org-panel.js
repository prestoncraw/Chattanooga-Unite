export default function OrgPanel({ organizations }) {
    return (
        <div>
            <h2>Your Organizations:</h2>
            {organizations.length == 0 && <div>No organizations with user as owner found. </div>}
            {organizations.map(orgs =>
                <div key={orgs.id}><a href={`/dashboard/org/${orgs.id}`}>{orgs.name}</a></div>
            )}

        </div>
    );
}