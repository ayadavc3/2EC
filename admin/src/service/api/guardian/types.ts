export type GuardianResponse = {
    id: string;
    title: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
};

export type GuardianCreateArgs = {
    title: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number: string;
};

export type GuardianUpdateArgs = {
    title?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    email?: string;
    phone_number?: string;
};