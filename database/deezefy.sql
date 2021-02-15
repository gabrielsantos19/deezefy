CREATE TABLE Usuario (
	email VARCHAR(45) NOT NULL,
	senha VARCHAR(130) NOT NULL,
	data_de_nascimento DATE,
	
	CONSTRAINT pk_usuario PRIMARY KEY (email)
);

CREATE TABLE Artista (
	nome_artistico VARCHAR(45) NOT NULL,
	biografia TEXT,
	ano_de_formacao INT NOT NULL,
	usuario VARCHAR(45) NOT NULL,
	
	CONSTRAINT pk_artista PRIMARY KEY (usuario),
	CONSTRAINT fk_usuario
		FOREIGN KEY (usuario) REFERENCES Usuario(email)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Ouvinte (
	primeiro_nome VARCHAR(45) NOT NULL,
	sobrenome VARCHAR(100) NOT NULL,
	telefone VARCHAR(14) ARRAY,
	usuario VARCHAR(45) NOT NULL,
	
	CONSTRAINT pk_ouvinte PRIMARY KEY (usuario),
	CONSTRAINT fk_usuario
		FOREIGN KEY (usuario) REFERENCES Usuario(email)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Musica (
	id SERIAL,
	nome VARCHAR(45) NOT NULL,
	duracao INT NOT NULL,
	
	CONSTRAINT pk_musica PRIMARY KEY (id)
);

CREATE TABLE Album (
	id SERIAL,
	titulo VARCHAR(45) NOT NULL,
	ano_de_lancamento INT NOT NULL,
	lanca VARCHAR(45),
	
	CONSTRAINT pk_album PRIMARY KEY (id),
	CONSTRAINT fk_artista
		FOREIGN KEY (lanca) REFERENCES Artista (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TYPE status_type AS ENUM('ativo', 'inativo');
CREATE TABLE Playlist (
	nome VARCHAR(45),
	status status_type NOT NULL,
	criador VARCHAR(45) NOT NULL,
	data_da_criacao DATE NOT NULL,

	CONSTRAINT pk_playlist PRIMARY KEY (nome, criador),
	CONSTRAINT fk_usuario
		FOREIGN KEY (criador) REFERENCES Usuario (email)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TYPE estilo_type AS ENUM('Blues', 'rock', 'mpb', 'samba', 'sertanejo', 'jazz', 'classica');
CREATE TABLE Genero (
	nome VARCHAR(45),
	estilo estilo_type NOT NULL,
	
	CONSTRAINT pk_genero PRIMARY KEY (nome)
);

CREATE TABLE Evento (
	id SERIAL,
	nome VARCHAR(45) NOT NULL,
	organizador VARCHAR(45) NOT NULL,
	
	CONSTRAINT pk_evento PRIMARY KEY (id),
	CONSTRAINT fk_usuario
		FOREIGN KEY (organizador) REFERENCES Usuario (email)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Local (
	id SERIAL,
	pais VARCHAR(45) NOT NULL,
	cidade VARCHAR(45) NOT NULL,
	
	CONSTRAINT pk_local PRIMARY KEY (id)
);

CREATE TABLE Perfil (
	id SERIAL,
	infromacoes_relevantes TEXT,
	identifica VARCHAR(45) NOT NULL,
	
	CONSTRAINT pk_perfil PRIMARY KEY (id),
	CONSTRAINT fk_ouvinte 
		FOREIGN KEY (identifica) REFERENCES Ouvinte (usuario)
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

-- Relacionamentos
CREATE TABLE Segue (
	artista VARCHAR(45) NOT NULL,
	ouvinte VARCHAR(45) NOT NULL,

	CONSTRAINT pk_segue PRIMARY KEY (artista, ouvinte),
	CONSTRAINT fk_artista 
		FOREIGN KEY (artista) REFERENCES Artista (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_ouvinte 
		FOREIGN KEY (ouvinte) REFERENCES Ouvinte (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Curte (
	musica INT NOT NULL,
	ouvinte VARCHAR(45) NOT NULL,
	
	CONSTRAINT pk_curte PRIMARY KEY (musica, ouvinte),
	CONSTRAINT fk_musica
		FOREIGN KEY (musica) REFERENCES Musica (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_ouvinte 
		FOREIGN KEY (ouvinte) REFERENCES Ouvinte (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Ouvinte_salva_playlist (
	ouvinte VARCHAR(45) NOT NULL,
	nome VARCHAR(45) NOT NULL,
	criador VARCHAR(45) NOT NULL,

	CONSTRAINT pk_ouvinte_salva_playliste 
		PRIMARY KEY (ouvinte, nome, criador),
	CONSTRAINT fk_ouvinte 
		FOREIGN KEY (ouvinte) REFERENCES Ouvinte (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_playlist
		FOREIGN KEY (nome, criador) REFERENCES Playlist (nome, criador)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
	
CREATE TABLE Ouvinte_salva_album (
	album INT NOT NULL,
	ouvinte VARCHAR(45) NOT NULL,

	CONSTRAINT pk_ouvinte_salva_album 
		PRIMARY KEY (album, ouvinte),
	CONSTRAINT fk_album
		FOREIGN KEY (album) REFERENCES Album (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_ouvinte 
		FOREIGN KEY (ouvinte) REFERENCES Ouvinte (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
	
CREATE TABLE Grava (
	artista VARCHAR(45) NOT NULL,
	musica INT NOT NULL,

	CONSTRAINT pk_grava
		PRIMARY KEY (artista, musica),
	CONSTRAINT fk_artista
		FOREIGN KEY (artista) REFERENCES Artista (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_musica
		FOREIGN KEY (musica) REFERENCES Musica (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
	
CREATE TABLE Artistas_favoritos (
	artista VARCHAR(45) NOT NULL,
	perfil INT NOT NULL,

	CONSTRAINT pk_artistas_favoritos
		PRIMARY KEY (artista, perfil),
	CONSTRAINT fk_artista
		FOREIGN KEY (artista) REFERENCES Artista (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_perfil
		FOREIGN KEY (perfil) REFERENCES Perfil (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Artista_possui_genero (
	genero VARCHAR(45) NOT NULL,
	artista VARCHAR(45) NOT NULL,

	CONSTRAINT pk_artista_possui_genero
		PRIMARY KEY (genero, artista),
	CONSTRAINT fk_genero
		FOREIGN KEY (genero) REFERENCES Genero (nome)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_artista
		FOREIGN KEY (artista) REFERENCES Artista (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Ocorre (
	data DATE,
	local INT NOT NULL,
	artista VARCHAR(45) NOT NULL,
	evento INT NOT NULL,

	CONSTRAINT pk_ocorre
		PRIMARY KEY (local, artista, evento),
	CONSTRAINT fk_local
		FOREIGN KEY (local) REFERENCES Local (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_artista
		FOREIGN KEY (artista) REFERENCES Artista (usuario)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_evento
		FOREIGN KEY (evento) REFERENCES Evento (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Musica_em_playlist (
	musica INT NOT NULL,
	nome VARCHAR(45) NOT NULL,
	criador VARCHAR(45) NOT NULL,

	CONSTRAINT pk_musica_em_playlist
		PRIMARY KEY (musica, nome, criador),
	CONSTRAINT fk_musica
		FOREIGN KEY (musica) REFERENCES Musica (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_playlist
		FOREIGN KEY (nome, criador) REFERENCES Playlist (nome, criador)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Album_contem_musica (
	album INT NOT NULL,
	musica INT NOT NULL,

	CONSTRAINT pk_album_contem_musica
		PRIMARY KEY (album, musica),
	CONSTRAINT fk_album
		FOREIGN KEY (album) REFERENCES Album (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_musica
		FOREIGN KEY (musica) REFERENCES Musica (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Musica_possui_genero (
	genero VARCHAR(45) NOT NULL,
	musica INT NOT NULL,

	CONSTRAINT pk_musica_possui_genero
		PRIMARY KEY (genero, musica),
	CONSTRAINT fk_genero
		FOREIGN KEY (genero) REFERENCES Genero (nome)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_musica
		FOREIGN KEY (musica) REFERENCES Musica (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Generos_favoritos (
	genero VARCHAR(45) NOT NULL,
	perfil INT NOT NULL,

	CONSTRAINT pk_generos_favoritos
		PRIMARY KEY (genero, perfil),
	CONSTRAINT fk_genero
		FOREIGN KEY (genero) REFERENCES Genero (nome)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CONSTRAINT fk_perfil
		FOREIGN KEY (perfil) REFERENCES Perfil (id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);
