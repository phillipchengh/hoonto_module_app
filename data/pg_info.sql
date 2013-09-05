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


--
-- Name: semver; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS semver WITH SCHEMA public;


--
-- Name: EXTENSION semver; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION semver IS 'Semantic version data type';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: mods_list; Type: TABLE; Schema: public; Owner: phillip; Tablespace: 
--

CREATE TABLE mods_list (
    name character varying(24),
    description character varying(150),
    mod_timestamp timestamp with time zone,
    version semver,
    add_timestamp timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.mods_list OWNER TO phillip;

--
-- Data for Name: mods_list; Type: TABLE DATA; Schema: public; Owner: phillip
--

COPY mods_list (name, description, mod_timestamp, version, add_timestamp) FROM stdin;
Super Module	Adds a cape to node full of hope	\N	0.0.1	2013-09-04 21:10:25.185653
Planet Express	Reliable interplanetary delivery. Serving the Milky Way and Beyond!	\N	0.0.1	2013-09-04 21:10:25.185653
<>JS	Model. View. Whatever.	\N	0.0.1	2013-09-04 21:10:25.185653
Fourth	I do not like the number before this.	\N	0.0.1	2013-09-04 21:10:25.185653
Test Module	This module's entire purpose is just to test POST.	\N	0.0.1	2013-09-04 21:10:25.185653
The Test Returns!	Just another description.	\N	0.0.1	2013-09-04 21:10:25.185653
Node Module	I've got it.	\N	0.0.1	2013-09-04 21:10:25.185653
Another Node Module	Look even more!	\N	0.0.1	2013-09-04 21:10:25.185653
24 Char Not Enough	It really isn't.	\N	0.0.1	2013-09-04 21:10:25.185653
Still Not Enough	Will this work finally?	\N	0.0.1	2013-09-04 21:10:25.185653
One More Time	Not the daft punk song.	\N	0.0.1	2013-09-04 21:10:25.185653
\.


--
-- Name: mods_mod_name_key; Type: CONSTRAINT; Schema: public; Owner: phillip; Tablespace: 
--

ALTER TABLE ONLY mods_list
    ADD CONSTRAINT mods_mod_name_key UNIQUE (name);


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

