import { container } from "tsyringe";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealMailProvider } from "./mailProvider/implementations/EtherealMailProvider/EtherealMailProvider";

container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());
