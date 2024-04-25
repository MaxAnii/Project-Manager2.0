CREATE TABLE admin (
    id character varying(30) PRIMARY KEY,
    name character varying(50),
    email character varying(30),
    password character varying(10),
    collegename character varying(100),
    collegecode character varying(20)
);

CREATE TABLE department (
    dname character varying(50),
    hodname character varying(30),
    hodid character varying(30),
    hodemail character varying(30),
    password character varying(15),
    collegecode character varying(10),
    id character varying(20)
);

CREATE TABLE newproject (
    pid character varying(30),
    lid character varying(30),
    name character varying,
    mid character varying(30),
    description text,
    status boolean,
    dname character varying(30),
    finalize boolean DEFAULT false,
    reason text
);

CREATE TABLE professor (
    id character varying(20),
    name character varying(30),
    dname character varying(30),
    cc character varying(10),
    email character varying(30),
    password character varying(20),
    profid character varying(20)
);

CREATE TABLE projectmember (
    pid character varying(30),
    usn character varying(30)
);

CREATE TABLE student (
    usn character varying(10),
    name character varying(30),
    collegename character varying(50),
    collegecode character varying(10),
    email character varying(30),
    password character varying(20),
    dname character varying(30),
    id character varying(20)
);
