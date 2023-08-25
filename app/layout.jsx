import Provider from "./context/Provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de Tarefas",
  description: "Criando as suas tarefas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
