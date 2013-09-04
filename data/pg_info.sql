--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: mods_list; Type: TABLE; Schema: public; Owner: phillip; Tablespace: 
--

CREATE TABLE mods_list (
    mod_name character varying(24),
    mod_desc character varying(150),
    add_date date DEFAULT ('now'::text)::date NOT NULL
);


ALTER TABLE public.mods_list OWNER TO phillip;

--
-- Data for Name: mods_list; Type: TABLE DATA; Schema: public; Owner: phillip
--

COPY mods_list (mod_name, mod_desc, add_date) FROM stdin;
Super Module	Adds a cape to node full of hope	2013-09-03
Planet Express	Reliable interplanetary delivery. Serving the Milky Way and Beyond!	2013-09-03
<>JS	Model. View. Whatever.	2013-09-03
Fourth	I do not like the number before this.	2013-09-03
Test Module	This module's entire purpose is just to test POST.	2013-09-03
The Test Returns!	Just another description.	2013-09-03
Node Module	I've got it.	2013-09-03
Another Node Module	Look even more!	2013-09-03
24 Char Not Enough	It really isn't.	2013-09-03
Still Not Enough	Will this work finally?	2013-09-03
One More Time	Not the daft punk song.	2013-09-03
\.


--
-- Name: mods_mod_name_key; Type: CONSTRAINT; Schema: public; Owner: phillip; Tablespace: 
--

ALTER TABLE ONLY mods_list
    ADD CONSTRAINT mods_mod_name_key UNIQUE (mod_name);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

