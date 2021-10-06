/* TypeScript testing style for COMP30022 IT Project
 * Written by Nathanael Hananto Putro (nputro@student.unimelb.edu.au) 01/10/2021
 */

/* For general code style, refer to the [coding standards](./coding.standard.ts).
 */

/* Test data
 *
 * Initialise test data within a JSON object with fields that
 * correspond to the API endpoint paramters/body format.
 * Declare these objects as a constant because these
 * objects should *not* change throughout testing.
 */

/* GOOD:
 */
const TEST_OBJECT = {
    firstName: "Test",
    lastName: "McTest",
    dateOfBirth: new Date()
};

/* BAD:
 */
/* Each field is declared as its own constant.
 * This makes comparing outputs more difficult, and
 * is prone to break if any changes are required.
 */
const TEST_OBJECT_FIRSTNAME: string = "Test";
const TEST_OBJECT_LASTNAMEL string = "McTest";
const TEST_OBJECT_DATEOFBIRTH: string = new Date();

/* Expected outputs
 *
 * Compare the expected outputs of the test cases to the existing test data.
 * Magic values should not be used here, because they detract away from the purpose of testing.
 */

/* GOOD:
 */
expect(res.status).toBe((new OKSuccess).status);
expect(res.data).toBe(TEST_OBJECT);

/* BAD:
 */
expect(res.status).toBe(200);
expect(res.data).toBe({
    firstName: "Test",
    lastName: "McTest",
    dateOfBirth: new Date()
});
