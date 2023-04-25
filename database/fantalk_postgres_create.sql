-- PostgreSQL database dump

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

--Creating tables--
CREATE TABLE public.eventuser (
  "_id" SERIAL NOT NULL,
	"name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "event_id" integer NOT NULL,
  "ishost" boolean NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.eventtalk (
  "_id" SERIAL NOT NULL,
	"name" varchar NOT NULL,
  "code" integer NOT NULL,
	CONSTRAINT "event_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.eventsession (
  "cookie" integer NOT NULL UNIQUE
  ) WITH (
  OIDS=FALSE
);


--Adding Contraints to Foreign Keys--
ALTER TABLE public.eventuser ADD CONSTRAINT "user_fk1" FOREIGN KEY ("event_id") REFERENCES  public.eventtalk("_id");
ALTER TABLE public.eventsession ADD CONSTRAINT "session_fk1" FOREIGN KEY ("cookie") REFERENCES  public.eventuser("_id");



--Inserting data into Database--
INSERT INTO public.eventtalk (name, code) VALUES ('concert', 123);
INSERT INTO public.eventuser (name, password, event_id, ishost) VALUES ('Rihanna', 'hello', 1, true);
