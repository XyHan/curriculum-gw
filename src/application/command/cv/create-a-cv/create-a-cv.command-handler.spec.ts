import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { CreateACvCommand } from './create-a-cv.command';
import { CreateACvCommandHandler } from './create-a-cv.command-handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { ConfigService } from '../../../../infrastructure/config/config.service';

describe('CreateACVCommandHandler tests', () => {
  describe('success', () => {
    it('Send CreateACVCommand in amqp bus', async () => {
      const loggerMock = new LoggerMock();
      const publisherMock: PublisherInterface = {
        publish: jest.fn((command: CreateACvCommand) => {
          return new Promise(resolve => {
            setTimeout(() => { resolve(); }, 30);
          });
        }),
        close: jest.fn(),
      }
      const handler = new CreateACvCommandHandler(publisherMock, loggerMock, new ConfigService());
      const command = new CreateACvCommand('181a146e-8c58-44c2-a828-1439b606e1e7', '', '', '', '', '', 0, '', '', '', '', '');
      const handledCommand = await handler.handle(command);
      expect(handledCommand.requestId).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });
  });

  describe('error', () => {
    it('Amqp bus exception', async () => {
      const loggerMock = new LoggerMock();
      const publisherMock: PublisherInterface = {
        publish: jest.fn((command: CreateACvCommand) => {
          return new Promise((resolve, reject) => {
            // simulate request delay
            setTimeout(() => reject(new Error(`repository timeout requestId ${command.requestId}`)), 20);
          });
        }),
        close: jest.fn(),
      }
      const handler = new CreateACvCommandHandler(publisherMock, loggerMock, new ConfigService());
      const command = new CreateACvCommand('181a146e-8c58-44c2-a828-1439b606e1e7', '', '', '', '', '', 0, '', '', '', '', '');
      try {
        await handler.handle(command);
      } catch (e) {
        expect(e.message).toEqual('CreateACvCommandHandler - handler - error during handling command 181a146e-8c58-44c2-a828-1439b606e1e7: repository timeout requestId 181a146e-8c58-44c2-a828-1439b606e1e7');
      }
    });
  });
});
