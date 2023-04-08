import { container } from "tsyringe";
import { $Date } from "./$Date";

container.registerSingleton<$Date>("Date", $Date);
