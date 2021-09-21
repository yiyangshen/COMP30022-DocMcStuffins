/* Import the required libraries and types */

function ViewContacts() {
    return (
        <div className="border">
            <div className="title">
                <h2>
                    <b>Contacts</b>
                </h2>
            </div>

            <table>
                <tr className="table-lable">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                <tr className="table-contents">
                    <td>Livya</td>
                    <td>+61 123456789</td>
                    <td>livya@gmail.com</td>
                </tr>
                <tr className="table-contents">
                    <td>Livya</td>
                    <td>+61 123456789</td>
                    <td>livya@gmail.com</td>
                </tr>
            </table>

            <div className="table"></div>
        </div>
    );
}

export default ViewContacts;
