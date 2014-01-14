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
    version semver,
    add_timestamp timestamp without time zone DEFAULT now() NOT NULL,
    downloads integer DEFAULT trunc((random() * (10000)::double precision)) NOT NULL,
    mod_timestamp timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.mods_list OWNER TO phillip;

--
-- Data for Name: mods_list; Type: TABLE DATA; Schema: public; Owner: phillip
--

COPY mods_list (name, description, version, add_timestamp, downloads, mod_timestamp) FROM stdin;
Super Module	Adds a cape to node full of hope	0.0.1	2013-09-04 21:10:25.185653	5075	2013-09-30 13:30:44.214411
Planet Express	Reliable interplanetary delivery. Serving the Milky Way and Beyond!	0.0.1	2013-09-04 21:10:25.185653	7788	2013-09-30 13:30:44.214411
<>JS	Model. View. Whatever.	0.0.1	2013-09-04 21:10:25.185653	4392	2013-09-30 13:30:44.214411
Fourth	I do not like the number before this.	0.0.1	2013-09-04 21:10:25.185653	3577	2013-09-30 13:30:44.214411
Test Module	This module's entire purpose is just to test POST.	0.0.1	2013-09-04 21:10:25.185653	215	2013-09-30 13:30:44.214411
The Test Returns!	Just another description.	0.0.1	2013-09-04 21:10:25.185653	984	2013-09-30 13:30:44.214411
Node Module	I've got it.	0.0.1	2013-09-04 21:10:25.185653	2286	2013-09-30 13:30:44.214411
Another Node Module	Look even more!	0.0.1	2013-09-04 21:10:25.185653	4972	2013-09-30 13:30:44.214411
24 Char Not Enough	It really isn't.	0.0.1	2013-09-04 21:10:25.185653	2442	2013-09-30 13:30:44.214411
Still Not Enough	Will this work finally?	0.0.1	2013-09-04 21:10:25.185653	7213	2013-09-30 13:30:44.214411
One More Time	Not the daft punk song.	0.0.1	2013-09-04 21:10:25.185653	4748	2013-09-30 13:30:44.214411
undefined	undefined	\N	2013-09-27 20:42:31.085802	7038	2013-09-30 13:30:44.214411
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

