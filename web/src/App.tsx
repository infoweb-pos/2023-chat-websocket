import { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Grid,
	Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export type TipoMensagem = {
	id: number;
	texto: string;
	proprietario: boolean;
	usuario?: string;
};
const ChatUI = () => {
	const [texto, setTextoMensagem] = useState("");
	const [mensagens, setMensagens] = useState<Array<TipoMensagem>>([
		{ id: 1, texto: "Olá pessoa!", proprietario: false, usuario: "robô" },
		{ id: 2, texto: "Alô!", proprietario: true },
		{
			id: 3,
			texto: "Como posso ajuda-lo hoje?",
			proprietario: false,
			usuario: "robô",
		},
	]);

	const handleSend = () => {
		if (texto.trim() !== "") {
			const mensagem: TipoMensagem = {
				id: mensagens.length + 1,
				texto: texto,
				proprietario: true,
			};
			setMensagens([...mensagens, mensagem]);
			console.log(texto);
			setTextoMensagem("");
		}
	};

	const handleTextoMudou = (event) => {
		setTextoMensagem(event.target.value);
	};

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				bgcolor: "grey.200",
			}}
		>
			<Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
				{mensagens.map((msg) => (
					<Mensagem key={msg.id} mensagem={msg} />
				))}
			</Box>
			<Box sx={{ p: 2, backgroundColor: "background.default" }}>
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<TextField
							size="small"
							fullWidth
							placeholder="Digite a mensagem"
							variant="outlined"
							value={texto}
							onChange={handleTextoMudou}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							fullWidth
							color="primary"
							variant="contained"
							endIcon={<SendIcon />}
							onClick={handleSend}
						>
							Enviar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

const Mensagem = ({ mensagem }) => {
	const ehAlinhadoNaDireita = !mensagem.proprietario;

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: ehAlinhadoNaDireita ? "flex-start" : "flex-end",
				mb: 2,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: ehAlinhadoNaDireita ? "row" : "row-reverse",
					alignItems: "center",
				}}
			>
				<Paper
					variant="outlined"
					sx={{
						p: 2,
						ml: ehAlinhadoNaDireita ? 1 : 0,
						mr: ehAlinhadoNaDireita ? 0 : 1,
						backgroundColor: ehAlinhadoNaDireita
							? "primary.light"
							: "secondary.light",
						borderRadius: ehAlinhadoNaDireita
							? "20px 20px 20px 5px"
							: "20px 20px 5px 20px",
					}}
				>
					{ehAlinhadoNaDireita ? (
						<Typography variant="body2">
							{mensagem.usuario}:
						</Typography>
					) : null}
					<Typography variant="body1">{mensagem.texto}</Typography>
				</Paper>
			</Box>
		</Box>
	);
};

export default ChatUI;
