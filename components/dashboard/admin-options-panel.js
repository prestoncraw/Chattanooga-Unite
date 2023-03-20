export default function AdminOptionsPanel() {
    return (
        <> <h2>Admin Actions: </h2>
            <ul>
                <li>
                    <a href="/dashboard/admin/orgs/create">
                        Create Organization
                    </a>
                </li>
                <li>
                    <a href="/dashboard/admin/orgs">
                        View all Organizations
                    </a>
                </li>
                <li>
                    <a href="/dashboard/admin/metrics">
                        View Metrics
                    </a>
                </li>
                <li>
                    <a href="/dashboard/admin/activity">
                        Activity Log
                    </a>
                </li>
            </ul>

        </>
    );
}