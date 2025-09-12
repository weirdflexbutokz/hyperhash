#TODO: Crear script para descargar wordlists 1/5
wget https://github.com/RykerWilder/rockyou.txt/raw/refs/heads/main/rockyou.txt.zip
unzip rockyou.txt.zip -d wordlists
rm rockyou.txt.zip

# Usar carpeta temporal para SecLists
git clone --no-checkout https://github.com/danielmiessler/SecLists.git
git -C "SecLists" sparse-checkout init --cone
git -C "SecLists" sparse-checkout set Passwords/Common-Credentials
git -C "SecLists" checkout

cp "./SecLists/Passwords/Common-Credentials/best15.txt" "wordlists/best15.txt"

rm -fr "SecLists"