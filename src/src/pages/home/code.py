import gspread
from oauth2client.service_account import ServiceAccountCredentials
import telebot
import schedule
import time
from datetime import datetime

# Get today's date
today = datetime.today()

# Format today's date to show the day of the week
day_of_week = today.strftime("%A")

TOKEN = "6998860463:AAHjCM8F6GLSoGSMqc3OwoeGBzIuk3T2VGs"
bot = telebot.TeleBot(TOKEN)


# Configurar as credenciais
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name('sigma-heuristic-396601-eaa9bde4b103.json', scope)
client = gspread.authorize(credentials)

# Abrir a planilha pelo link

sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1YvCqBrNw5l4EFNplmpRBFrFJpjl4EALlVNDk3pwp_dQ/edit')

# Escolher a aba que contém os dados do cardápio
worksheet = sheet.get_worksheet(1)

# Encontrar o dia em que o prato Strogonoff está disponível
menu = worksheet.get_all_values()
days_of_week = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"]
days_of_week_pt = {
    "Monday": "Segunda-Feira",
    "Tuesday": "Terça-Feira",
    "Wednesday": "Quarta-Feira",
    "Thursday": "Quinta-Feira",
    "Friday": "Sexta-Feira",
    "Saturday": "Sábado",
    "Sunday": "Domingo"
}

find = worksheet.find('Strogonoff')

def main():
    periodo = 0
    lista = []
    for row in menu:
        periodo = periodo+1
        periodo_definido = ''
        for column in row:
            print(column)
main()