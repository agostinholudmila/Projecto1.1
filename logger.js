//importando biblioteca para criar logs estruturados
import winston from "winston";
//sintaxe para criar um logger
const logger = winston.createLogger ({
// mostra logs de nível info e acima e  formato dos logs
level: 'info',
format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
),
//o logger precisa saber para onde enviar os logs. Isso chama-se transport no winston.
transports: [
    new winston.transports.Console()
]
});
export default logger ;//não tem destino definido — ele só disponibiliza o logger para qualquer ficheiro que queira importá-lo.