--
-- PostgreSQL database dump
--

\restrict n8VCx3vYrx9BBitd04PtQAoANC6fo55J6Y7szwXZwZY1TZZh6fxBzOchXAuYx7M

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-10-21 18:55:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 235 (class 1259 OID 16741)
-- Name: achievement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.achievement (
    achievement_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    icon_url text,
    badge_type character varying(50),
    points integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.achievement OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16410)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    user_id uuid NOT NULL,
    admin_level character varying(20),
    department character varying(100),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16482)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    icon_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16858)
-- Name: config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.config (
    config_id uuid DEFAULT gen_random_uuid() NOT NULL,
    config_key character varying(100) NOT NULL,
    config_value text,
    updated_by uuid,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.config OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16496)
-- Name: difficulty_level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.difficulty_level (
    difficulty_id uuid DEFAULT gen_random_uuid() NOT NULL,
    level_name character varying(50) NOT NULL,
    level_order integer NOT NULL,
    description text
);


ALTER TABLE public.difficulty_level OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16511)
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise (
    exercise_id uuid DEFAULT gen_random_uuid() NOT NULL,
    category_id uuid NOT NULL,
    difficulty_id uuid NOT NULL,
    title character varying(150) NOT NULL,
    instructions text,
    target_text text,
    activity_type character varying(50) NOT NULL,
    media_url text,
    duration_seconds integer,
    xp_reward integer DEFAULT 0 NOT NULL,
    source character varying(20) DEFAULT 'curated'::character varying NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT exercise_duration_seconds_check CHECK ((duration_seconds > 0)),
    CONSTRAINT exercise_source_check CHECK (((source)::text = ANY ((ARRAY['curated'::character varying, 'ai_generated'::character varying])::text[]))),
    CONSTRAINT exercise_xp_reward_check CHECK ((xp_reward >= 0))
);


ALTER TABLE public.exercise OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16663)
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    feedback_id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id uuid NOT NULL,
    patient_id uuid,
    therapist_id uuid,
    rating integer,
    comments text,
    feedback_type character varying(50),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT feedback_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16838)
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    notification_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title character varying(150) NOT NULL,
    message text,
    type character varying(50),
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16442)
-- Name: patient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient (
    user_id uuid NOT NULL,
    date_of_birth date,
    gender character varying(20),
    profile_photo character varying(255),
    bio text,
    guardian_name character varying(100),
    guardian_contact character varying(20),
    speech_condition text,
    speech_goals text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.patient OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16457)
-- Name: patient_therapist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patient_therapist (
    patient_therapist_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid NOT NULL,
    therapist_id uuid NOT NULL,
    assigned_at timestamp with time zone DEFAULT now() NOT NULL,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    CONSTRAINT patient_therapist_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'ended'::character varying])::text[])))
);


ALTER TABLE public.patient_therapist OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16567)
-- Name: plan_exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_exercise (
    plan_exercise_id uuid DEFAULT gen_random_uuid() NOT NULL,
    plan_id uuid NOT NULL,
    exercise_id uuid NOT NULL,
    sequence_no integer,
    target_frequency integer,
    target_duration integer,
    instructions text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.plan_exercise OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16691)
-- Name: progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progress (
    progress_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_therapist_id uuid NOT NULL,
    exercise_id uuid NOT NULL,
    sessions_completed integer DEFAULT 0 NOT NULL,
    total_attempts integer DEFAULT 0 NOT NULL,
    average_score numeric(5,2),
    time_spent_seconds integer DEFAULT 0 NOT NULL,
    last_practiced_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.progress OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16794)
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report (
    report_id uuid DEFAULT gen_random_uuid() NOT NULL,
    generated_by uuid,
    patient_id uuid NOT NULL,
    report_type character varying(50),
    parameters jsonb,
    summary text,
    is_ai_draft boolean DEFAULT false NOT NULL,
    review_status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    file_url text,
    generated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT report_review_status_check CHECK (((review_status)::text = ANY ((ARRAY['pending'::character varying, 'reviewed'::character varying])::text[])))
);


ALTER TABLE public.report OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16780)
-- Name: reward; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reward (
    reward_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    points_required integer DEFAULT 0 NOT NULL,
    reward_type character varying(50),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reward OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16592)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    session_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_therapist_id uuid NOT NULL,
    plan_id uuid,
    scheduled_at timestamp with time zone,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    duration_seconds integer,
    session_type character varying(50),
    status character varying(20) DEFAULT 'scheduled'::character varying NOT NULL,
    notes text,
    xp_awarded integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT session_status_check CHECK (((status)::text = ANY ((ARRAY['scheduled'::character varying, 'in_progress'::character varying, 'completed'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16619)
-- Name: session_recording; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session_recording (
    recording_id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id uuid NOT NULL,
    exercise_id uuid,
    file_url text NOT NULL,
    file_type character varying(20),
    transcript text,
    duration_seconds integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.session_recording OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16642)
-- Name: speech_analysis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.speech_analysis (
    analysis_id uuid DEFAULT gen_random_uuid() NOT NULL,
    recording_id uuid NOT NULL,
    expected_text text,
    recognized_text text,
    accuracy_score numeric(5,2),
    fluency_score numeric(5,2),
    pronunciation_score numeric(5,2),
    pace_score numeric(5,2),
    target_detected boolean,
    analyzed_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT speech_analysis_accuracy_score_check CHECK (((accuracy_score >= (0)::numeric) AND (accuracy_score <= (100)::numeric))),
    CONSTRAINT speech_analysis_fluency_score_check CHECK (((fluency_score >= (0)::numeric) AND (fluency_score <= (100)::numeric))),
    CONSTRAINT speech_analysis_pace_score_check CHECK (((pace_score >= (0)::numeric) AND (pace_score <= (100)::numeric))),
    CONSTRAINT speech_analysis_pronunciation_score_check CHECK (((pronunciation_score >= (0)::numeric) AND (pronunciation_score <= (100)::numeric)))
);


ALTER TABLE public.speech_analysis OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16720)
-- Name: streak; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.streak (
    streak_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid NOT NULL,
    current_streak integer DEFAULT 0 NOT NULL,
    longest_streak integer DEFAULT 0 NOT NULL,
    last_activity_date date,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.streak OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16821)
-- Name: system_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_log (
    log_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    action character varying(50) NOT NULL,
    entity_type character varying(50),
    entity_id uuid,
    details text,
    ip_address character varying(45),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.system_log OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16423)
-- Name: therapist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.therapist (
    user_id uuid NOT NULL,
    admin_id uuid,
    qualification character varying(100),
    specialization character varying(100),
    license_no character varying(50),
    experience_years integer,
    organization character varying(150),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT therapist_experience_years_check CHECK ((experience_years >= 0))
);


ALTER TABLE public.therapist OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16895)
-- Name: therapist_change_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.therapist_change_request (
    request_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_therapist_id uuid NOT NULL,
    reason text,
    related_feedback_id uuid,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    requested_at timestamp with time zone DEFAULT now() NOT NULL,
    resolved_at timestamp with time zone,
    resolved_by uuid,
    CONSTRAINT therapist_change_request_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[])))
);


ALTER TABLE public.therapist_change_request OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16877)
-- Name: therapist_feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.therapist_feedback (
    feedback_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_therapist_id uuid NOT NULL,
    rating integer,
    comments text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT therapist_feedback_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.therapist_feedback OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16545)
-- Name: therapy_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.therapy_plan (
    plan_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_therapist_id uuid NOT NULL,
    plan_name character varying(150) NOT NULL,
    goal text,
    start_date date,
    end_date date,
    status character varying(20) DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT therapy_plan_check CHECK (((end_date IS NULL) OR (end_date >= start_date))),
    CONSTRAINT therapy_plan_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'completed'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.therapy_plan OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16757)
-- Name: user_achievement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_achievement (
    user_achievement_id uuid DEFAULT gen_random_uuid() NOT NULL,
    patient_id uuid NOT NULL,
    achievement_id uuid NOT NULL,
    earned_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_achievement OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash character varying(255) NOT NULL,
    mobile_number character varying(20),
    role character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    last_login timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['patient'::character varying, 'therapist'::character varying, 'admin'::character varying])::text[]))),
    CONSTRAINT users_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'blocked'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 5082 (class 2606 OID 16756)
-- Name: achievement achievement_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievement
    ADD CONSTRAINT achievement_name_key UNIQUE (name);


--
-- TOC entry 5084 (class 2606 OID 16754)
-- Name: achievement achievement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievement
    ADD CONSTRAINT achievement_pkey PRIMARY KEY (achievement_id);


--
-- TOC entry 5039 (class 2606 OID 16417)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5048 (class 2606 OID 16495)
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- TOC entry 5050 (class 2606 OID 16493)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 5098 (class 2606 OID 16871)
-- Name: config config_config_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_config_key_key UNIQUE (config_key);


--
-- TOC entry 5100 (class 2606 OID 16869)
-- Name: config config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_pkey PRIMARY KEY (config_id);


--
-- TOC entry 5052 (class 2606 OID 16508)
-- Name: difficulty_level difficulty_level_level_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulty_level
    ADD CONSTRAINT difficulty_level_level_name_key UNIQUE (level_name);


--
-- TOC entry 5054 (class 2606 OID 16510)
-- Name: difficulty_level difficulty_level_level_order_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulty_level
    ADD CONSTRAINT difficulty_level_level_order_key UNIQUE (level_order);


--
-- TOC entry 5056 (class 2606 OID 16506)
-- Name: difficulty_level difficulty_level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulty_level
    ADD CONSTRAINT difficulty_level_pkey PRIMARY KEY (difficulty_id);


--
-- TOC entry 5058 (class 2606 OID 16534)
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (exercise_id);


--
-- TOC entry 5072 (class 2606 OID 16675)
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedback_id);


--
-- TOC entry 5096 (class 2606 OID 16852)
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 5043 (class 2606 OID 16451)
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5046 (class 2606 OID 16470)
-- Name: patient_therapist patient_therapist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_therapist
    ADD CONSTRAINT patient_therapist_pkey PRIMARY KEY (patient_therapist_id);


--
-- TOC entry 5062 (class 2606 OID 16579)
-- Name: plan_exercise plan_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_exercise
    ADD CONSTRAINT plan_exercise_pkey PRIMARY KEY (plan_exercise_id);


--
-- TOC entry 5064 (class 2606 OID 16581)
-- Name: plan_exercise plan_exercise_plan_id_exercise_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_exercise
    ADD CONSTRAINT plan_exercise_plan_id_exercise_id_key UNIQUE (plan_id, exercise_id);


--
-- TOC entry 5074 (class 2606 OID 16709)
-- Name: progress progress_patient_therapist_id_exercise_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_patient_therapist_id_exercise_id_key UNIQUE (patient_therapist_id, exercise_id);


--
-- TOC entry 5076 (class 2606 OID 16707)
-- Name: progress progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_pkey PRIMARY KEY (progress_id);


--
-- TOC entry 5092 (class 2606 OID 16810)
-- Name: report report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (report_id);


--
-- TOC entry 5090 (class 2606 OID 16793)
-- Name: reward reward_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reward
    ADD CONSTRAINT reward_pkey PRIMARY KEY (reward_id);


--
-- TOC entry 5066 (class 2606 OID 16608)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (session_id);


--
-- TOC entry 5068 (class 2606 OID 16631)
-- Name: session_recording session_recording_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_recording
    ADD CONSTRAINT session_recording_pkey PRIMARY KEY (recording_id);


--
-- TOC entry 5070 (class 2606 OID 16657)
-- Name: speech_analysis speech_analysis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.speech_analysis
    ADD CONSTRAINT speech_analysis_pkey PRIMARY KEY (analysis_id);


--
-- TOC entry 5078 (class 2606 OID 16735)
-- Name: streak streak_patient_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.streak
    ADD CONSTRAINT streak_patient_id_key UNIQUE (patient_id);


--
-- TOC entry 5080 (class 2606 OID 16733)
-- Name: streak streak_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.streak
    ADD CONSTRAINT streak_pkey PRIMARY KEY (streak_id);


--
-- TOC entry 5094 (class 2606 OID 16832)
-- Name: system_log system_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_log
    ADD CONSTRAINT system_log_pkey PRIMARY KEY (log_id);


--
-- TOC entry 5104 (class 2606 OID 16909)
-- Name: therapist_change_request therapist_change_request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist_change_request
    ADD CONSTRAINT therapist_change_request_pkey PRIMARY KEY (request_id);


--
-- TOC entry 5102 (class 2606 OID 16889)
-- Name: therapist_feedback therapist_feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist_feedback
    ADD CONSTRAINT therapist_feedback_pkey PRIMARY KEY (feedback_id);


--
-- TOC entry 5041 (class 2606 OID 16431)
-- Name: therapist therapist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist
    ADD CONSTRAINT therapist_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5060 (class 2606 OID 16561)
-- Name: therapy_plan therapy_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapy_plan
    ADD CONSTRAINT therapy_plan_pkey PRIMARY KEY (plan_id);


--
-- TOC entry 5086 (class 2606 OID 16769)
-- Name: user_achievement user_achievement_patient_id_achievement_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT user_achievement_patient_id_achievement_id_key UNIQUE (patient_id, achievement_id);


--
-- TOC entry 5088 (class 2606 OID 16767)
-- Name: user_achievement user_achievement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT user_achievement_pkey PRIMARY KEY (user_achievement_id);


--
-- TOC entry 5035 (class 2606 OID 16409)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 5037 (class 2606 OID 16407)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5044 (class 1259 OID 16481)
-- Name: one_active_pair; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX one_active_pair ON public.patient_therapist USING btree (patient_id, therapist_id) WHERE ((status)::text = 'active'::text);


--
-- TOC entry 5105 (class 2606 OID 16418)
-- Name: admin admin_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 5133 (class 2606 OID 16872)
-- Name: config config_updated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.admin(user_id);


--
-- TOC entry 5111 (class 2606 OID 16535)
-- Name: exercise exercise_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- TOC entry 5112 (class 2606 OID 16540)
-- Name: exercise exercise_difficulty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_difficulty_id_fkey FOREIGN KEY (difficulty_id) REFERENCES public.difficulty_level(difficulty_id);


--
-- TOC entry 5121 (class 2606 OID 16681)
-- Name: feedback feedback_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(user_id);


--
-- TOC entry 5122 (class 2606 OID 16676)
-- Name: feedback feedback_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.session(session_id) ON DELETE CASCADE;


--
-- TOC entry 5123 (class 2606 OID 16686)
-- Name: feedback feedback_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_therapist_id_fkey FOREIGN KEY (therapist_id) REFERENCES public.therapist(user_id);


--
-- TOC entry 5132 (class 2606 OID 16853)
-- Name: notification notification_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 5109 (class 2606 OID 16471)
-- Name: patient_therapist patient_therapist_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_therapist
    ADD CONSTRAINT patient_therapist_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(user_id);


--
-- TOC entry 5110 (class 2606 OID 16476)
-- Name: patient_therapist patient_therapist_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_therapist
    ADD CONSTRAINT patient_therapist_therapist_id_fkey FOREIGN KEY (therapist_id) REFERENCES public.therapist(user_id);


--
-- TOC entry 5108 (class 2606 OID 16452)
-- Name: patient patient_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 5114 (class 2606 OID 16587)
-- Name: plan_exercise plan_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_exercise
    ADD CONSTRAINT plan_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(exercise_id);


--
-- TOC entry 5115 (class 2606 OID 16582)
-- Name: plan_exercise plan_exercise_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_exercise
    ADD CONSTRAINT plan_exercise_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.therapy_plan(plan_id) ON DELETE CASCADE;


--
-- TOC entry 5124 (class 2606 OID 16715)
-- Name: progress progress_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(exercise_id);


--
-- TOC entry 5125 (class 2606 OID 16710)
-- Name: progress progress_patient_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_patient_therapist_id_fkey FOREIGN KEY (patient_therapist_id) REFERENCES public.patient_therapist(patient_therapist_id);


--
-- TOC entry 5129 (class 2606 OID 16811)
-- Name: report report_generated_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_generated_by_fkey FOREIGN KEY (generated_by) REFERENCES public.users(user_id);


--
-- TOC entry 5130 (class 2606 OID 16816)
-- Name: report report_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(user_id);


--
-- TOC entry 5116 (class 2606 OID 16609)
-- Name: session session_patient_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_patient_therapist_id_fkey FOREIGN KEY (patient_therapist_id) REFERENCES public.patient_therapist(patient_therapist_id);


--
-- TOC entry 5117 (class 2606 OID 16614)
-- Name: session session_plan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.therapy_plan(plan_id);


--
-- TOC entry 5118 (class 2606 OID 16637)
-- Name: session_recording session_recording_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_recording
    ADD CONSTRAINT session_recording_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(exercise_id);


--
-- TOC entry 5119 (class 2606 OID 16632)
-- Name: session_recording session_recording_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session_recording
    ADD CONSTRAINT session_recording_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.session(session_id) ON DELETE CASCADE;


--
-- TOC entry 5120 (class 2606 OID 16658)
-- Name: speech_analysis speech_analysis_recording_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.speech_analysis
    ADD CONSTRAINT speech_analysis_recording_id_fkey FOREIGN KEY (recording_id) REFERENCES public.session_recording(recording_id) ON DELETE CASCADE;


--
-- TOC entry 5126 (class 2606 OID 16736)
-- Name: streak streak_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.streak
    ADD CONSTRAINT streak_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(user_id) ON DELETE CASCADE;


--
-- TOC entry 5131 (class 2606 OID 16833)
-- Name: system_log system_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_log
    ADD CONSTRAINT system_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 5106 (class 2606 OID 16437)
-- Name: therapist therapist_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist
    ADD CONSTRAINT therapist_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admin(user_id);


--
-- TOC entry 5135 (class 2606 OID 16910)
-- Name: therapist_change_request therapist_change_request_patient_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist_change_request
    ADD CONSTRAINT therapist_change_request_patient_therapist_id_fkey FOREIGN KEY (patient_therapist_id) REFERENCES public.patient_therapist(patient_therapist_id);


--
-- TOC entry 5136 (class 2606 OID 16915)
-- Name: therapist_change_request therapist_change_request_related_feedback_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist_change_request
    ADD CONSTRAINT therapist_change_request_related_feedback_id_fkey FOREIGN KEY (related_feedback_id) REFERENCES public.therapist_feedback(feedback_id);


--
-- TOC entry 5137 (class 2606 OID 16920)
-- Name: therapist_change_request therapist_change_request_resolved_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist_change_request
    ADD CONSTRAINT therapist_change_request_resolved_by_fkey FOREIGN KEY (resolved_by) REFERENCES public.admin(user_id);


--
-- TOC entry 5134 (class 2606 OID 16890)
-- Name: therapist_feedback therapist_feedback_patient_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist_feedback
    ADD CONSTRAINT therapist_feedback_patient_therapist_id_fkey FOREIGN KEY (patient_therapist_id) REFERENCES public.patient_therapist(patient_therapist_id);


--
-- TOC entry 5107 (class 2606 OID 16432)
-- Name: therapist therapist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapist
    ADD CONSTRAINT therapist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 5113 (class 2606 OID 16562)
-- Name: therapy_plan therapy_plan_patient_therapist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.therapy_plan
    ADD CONSTRAINT therapy_plan_patient_therapist_id_fkey FOREIGN KEY (patient_therapist_id) REFERENCES public.patient_therapist(patient_therapist_id);


--
-- TOC entry 5127 (class 2606 OID 16775)
-- Name: user_achievement user_achievement_achievement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT user_achievement_achievement_id_fkey FOREIGN KEY (achievement_id) REFERENCES public.achievement(achievement_id);


--
-- TOC entry 5128 (class 2606 OID 16770)
-- Name: user_achievement user_achievement_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT user_achievement_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(user_id) ON DELETE CASCADE;


-- Completed on 2026-10-21 18:55:20

--
-- PostgreSQL database dump complete
--

\unrestrict n8VCx3vYrx9BBitd04PtQAoANC6fo55J6Y7szwXZwZY1TZZh6fxBzOchXAuYx7M

