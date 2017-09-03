create table person (
    person_id serial,
    first_name varchar not null,
    last_name varchar not null,
    nickname varchar,
    usba_member boolean not null default false,
    competition_level varchar,
    primary key(person_id)
);

---------------------------------------------------------------------------------

create table tournament (
    tournament_id serial,
    location_name varchar not null,
    location_address varchar not null,
    sanction_request_date date,
    sanction_approval_date date,
    tournamnet_start_date date not null,
    registration_time timestamp with time zone,
    event_1_start_time timestamp with time zone,
    rain_date date,
    rain_date_registration_time timestamp with time zone,
    rain_date_event_1_start_time timestamp with time zone,
    primary key(tournament_id)
);

---------------------------------------------------------------------------------

create table tournament_person (
    tournament_id integer not null,
    person_id integer not null,
    role varchar not null,
    primary key(tournament_id, person_id, role),
    foreign key(tournament_id) references tournament (tournament_id),
    foreign key(person_id) references person (person_id)
);

create index tournament_person_period_id_in on tournament_person (person_id);

---------------------------------------------------------------------------------

create table event (
    event_id serial,
    name varchar not null,
    primary key(event_id),
    unique (name)
);

insert into event (name) values ('Accuracy 50');
insert into event (name) values ('Accuracy 100');
insert into event (name) values ('Australian Round');
insert into event (name) values ('Trick Catch/Doubling');
insert into event (name) values ('Endurance');
insert into event (name) values ('Maximum Time Aloft 100');
insert into event (name) values ('Maximum Time Aloft Unlimited');
insert into event (name) values ('Individual Relay Trial');
insert into event (name) values ('Juggling');
insert into event (name) values ('Juggling, Five Minutes');
insert into event (name) values ('Long Distance');
insert into event (name) values ('GLORP');
insert into event (name) values ('Fast Catch');

---------------------------------------------------------------------------------

create table tournament_event (
    tournament_id integer not null,
    event_id integer not null,
    event_order integer not null,
    number_of_circles integer not null,
    primary key(tournament_id, event_id),
    foreign key(tournament_id) references tournament (tournament_id),
    foreign key(event_id) references event (event_id)
);

create index tournament_event_event_id_in on tournament_event (event_id);

---------------------------------------------------------------------------------

create table tournament_event_score (
    tournament_id integer not null,
    event_id integer not null,
    person_id integer not null,
    role varchar not null default 'thrower' check (role = 'thrower'),
    primary key(tournament_id, event_id, person_id),
    foreign key(tournament_id, event_id) references tournament_event (tournament_id, event_id),
    foreign key(tournament_id, person_id, role) references tournament_person (tournament_id, person_id, role)
);

create index tournament_event_score_event_id_in on tournament_event_score (event_id);
create index tournament_event_score_person_id_in on tournament_event_score (person_id);
