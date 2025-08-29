export type StudentResponse = {
    id: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
};

export type StudentCreateArgs = {
    first_name: string;
    last_name: string;
    middle_name?: string;
    email: string;
    phone_number: string;
};

export type StudentUpdateArgs = {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    email?: string;
    phone_number?: string;
};