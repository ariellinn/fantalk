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
CREATE TABLE public.user (
  "_id" SERIAL NOT NULL,
	"firstName" varchar NOT NULL,
  "password" varchar NOT NULL,
  "event_id" integer, NOT NULL
	CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.event (
  "_id" SERIAL NOT NULL,
	"name" varchar NOT NULL,
	"host_id" varchar NOT NULL,
	CONSTRAINT "event_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.session (
  "cookie" varchar NOT NULL, UNIQUE
)


--Adding Contraints to Foreign Keys--
ALTER TABLE public.user ADD CONSTRAINT "user_fk1" FOREIGN KEY ("event_id") REFERENCES  public.event("_id");

ALTER TABLE public.event ADD CONSTRAINT "event_fk1" FOREIGN KEY ("host_id") REFERENCES  public.user("_id");

ALTER TABLE public.session ADD CONSTRAINT "session_fk1" FOREIGN KEY ("cookie") REFERENCES  public.user("_id");



--Inserting data into Database--
 INSERT INTO public.people VALUES (1, 'Luke Skywalker', '77', 'blond', 'fair', 'blue', '19BBY', 'male', 1, 1, 172);
 INSERT INTO public.people VALUES (2, 'C-3PO', '75', 'n/a', 'gold', 'yellow', '112BBY', 'n/a', 2, 1, 167);
 INSERT INTO public.people VALUES (3, 'R2-D2', '32', 'n/a', 'white, blue', 'red', '33BBY', 'n/a', 2, 8, 96);