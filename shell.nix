{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs
    pkgs.redis
    pkgs.wget
    pkgs.unzip
  ];
}
