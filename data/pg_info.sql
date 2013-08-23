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
    mod_desc character varying(150)
);


ALTER TABLE public.mods_list OWNER TO phillip;

--
-- Data for Name: mods_list; Type: TABLE DATA; Schema: public; Owner: phillip
--

COPY mods_list (mod_name, mod_desc) FROM stdin;
Super Module	Adds a cape to node full of hope
Planet Express	Reliable interplanetary delivery. Serving the Milky Way and Beyond!
<>JS	Model. View. Whatever.
Fourth	I do not like the number before this.
Test Module	This module's entire purpose is just to test POST.
The Test Returns!	Just another description.
Node Module	I've got it.
Another Node Module	Look even more!
24 Char Not Enough	It really isn't.
Still Not Enough	Will this work finally?
One More Time	Not the daft punk song.
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

