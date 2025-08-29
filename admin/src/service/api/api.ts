import { GuardianClient } from "./guardian";
import { StudentClient } from "./student";

class Api {
    guardian: GuardianClient;
    student: StudentClient;

    constructor() {
        this.guardian = new GuardianClient();
        this.student = new StudentClient();
        // TODO: Add more clients here
    }
}

export const api = new Api();