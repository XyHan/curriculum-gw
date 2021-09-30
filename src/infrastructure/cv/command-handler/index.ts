import { CreateACvCommandHandlerAdapter } from './create-a-cv/create-a-cv.command-handler.adapter';
import { UpdateACvCommandHandlerAdapter } from './update-a-cv/update-a-cv.command-handler.adapter';

export const CvCommandHandler = [
  CreateACvCommandHandlerAdapter,
  UpdateACvCommandHandlerAdapter,
];
