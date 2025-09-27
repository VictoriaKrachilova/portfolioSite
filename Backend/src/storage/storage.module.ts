import { Module, Global } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { LocalFileStorage } from "./local-storage-class";

@Module({
	providers: [
		{
			provide: StorageService,
			useFactory: () => new StorageService(new LocalFileStorage()),
		},
	],
	exports: [StorageService],
})
export class StorageModule { }
