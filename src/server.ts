import app from "./app";
import { PORT } from "../environments/environment";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
