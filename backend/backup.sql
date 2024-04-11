--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    acc_id integer NOT NULL,
    user_email character varying(30) NOT NULL,
    passhash character varying(255) NOT NULL,
    account_type integer NOT NULL,
    detail_id integer NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_acc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_acc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_acc_id_seq OWNER TO postgres;

--
-- Name: accounts_acc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_acc_id_seq OWNED BY public.accounts.acc_id;


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    d_id integer NOT NULL,
    name character varying(20),
    email character varying(30),
    speciality character varying(30),
    experience integer,
    mobile character varying(10),
    passhash character varying(255)
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- Name: doctors_d_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctors_d_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doctors_d_id_seq OWNER TO postgres;

--
-- Name: doctors_d_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctors_d_id_seq OWNED BY public.doctors.d_id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    p_id integer NOT NULL,
    f_name character varying(20),
    l_name character varying(20),
    email character varying(30),
    passhash character varying(255),
    user_name character varying(30),
    age integer,
    gender character varying(10)
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- Name: patients_p_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patients_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.patients_p_id_seq OWNER TO postgres;

--
-- Name: patients_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patients_p_id_seq OWNED BY public.patients.p_id;


--
-- Name: accounts acc_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN acc_id SET DEFAULT nextval('public.accounts_acc_id_seq'::regclass);


--
-- Name: doctors d_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors ALTER COLUMN d_id SET DEFAULT nextval('public.doctors_d_id_seq'::regclass);


--
-- Name: patients p_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients ALTER COLUMN p_id SET DEFAULT nextval('public.patients_p_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (acc_id, user_email, passhash, account_type, detail_id) FROM stdin;
1	john@gmail.com	$2b$10$H9DvWRIAXKUmp3y7/NWtmuIbWrOl93D8FD5ulXPXAUtwj3L/PRTGC	2	1
2	john1@gmail.com	$2b$10$z0qtTYfSvYTX07.HYqMHnuUYR9.k5SvQOoJAd1RFnhtDaL5rOh6PS	1	2
3	adarsh@gmail.com	$2b$10$y5m8scMliHbHejPT1KNJh.bJzM1hsQwtdjE41tSVvP.bEaJWUg0A6	1	3
\.


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (d_id, name, email, speciality, experience, mobile, passhash) FROM stdin;
1	John	john@gmail.com	cardiologist	9	9900327651	\N
\.


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patients (p_id, f_name, l_name, email, passhash, user_name, age, gender) FROM stdin;
4	Jonathan	Job	john1@gmail.com	$2b$10$OVTN/zhJ55wLJwz7hPPN3.OgnRqXDdAFhpZ9Bo/OTu64/CnYAzmF2	jonathan	\N	\N
5	Adarsh	Prabhu	adarsh@gmail.com	$2b$10$BuaMh76EOofTDr6oMfsWvugzGc7/8Wi0nF0L.6yK18/uVx8XeRxSm	adarsh	42	Female
6	test	test	test@gmail.com	$2b$10$xG8.4hWoylo96RMXvHgrXe/AICI2pNR8G7Mvhy8iwq.wnJIK8XwTy	test	10	Male
\.


--
-- Name: accounts_acc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_acc_id_seq', 3, true);


--
-- Name: doctors_d_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctors_d_id_seq', 1, true);


--
-- Name: patients_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patients_p_id_seq', 6, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (acc_id);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (d_id);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (p_id);


--
-- Name: patients unique_user_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT unique_user_name UNIQUE (user_name);


--
-- PostgreSQL database dump complete
--

