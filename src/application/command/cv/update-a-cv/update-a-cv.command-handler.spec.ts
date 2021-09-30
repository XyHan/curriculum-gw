import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { UpdateACvCommand } from './update-a-cv.command';
import { UpdateACvCommandHandler } from './update-a-cv.command-handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { ConfigService } from '../../../../infrastructure/config/config.service';

describe('UpdateACVCommandHandler tests', () => {
  describe('success', () => {
    it('Send UpdateACVCommand in amqp bus', async () => {
      const loggerMock = new LoggerMock();
      const publisherMock: PublisherInterface = {
        publish: jest.fn((command: UpdateACvCommand) => {
          return new Promise(resolve => {
            setTimeout(() => { resolve(); }, 30);
          });
        }),
        close: jest.fn(),
      }
      const handler = new UpdateACvCommandHandler(publisherMock, loggerMock, new ConfigService());
      const command = new UpdateACvCommand('181a146e-8c58-44c2-a828-1439b606e1e7', '', '', '', '', '', 0, '', '', '', '', '');
      const handledCommand = await handler.handle(command);
      expect(handledCommand.requestId).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });
  });

  describe('error', () => {
    it('Amqp bus exception', async () => {
      const loggerMock = new LoggerMock();
      const publisherMock: PublisherInterface = {
        publish: jest.fn((command: UpdateACvCommand) => {
          return new Promise((resolve, reject) => {
            // simulate request delay
            setTimeout(() => reject(new Error(`repository timeout requestId ${command.requestId}`)), 20);
          });
        }),
        close: jest.fn(),
      }
      const handler = new UpdateACvCommandHandler(publisherMock, loggerMock, new ConfigService());
      const command = new UpdateACvCommand('181a146e-8c58-44c2-a828-1439b606e1e7', '', '', '', '', '', 0, '', '', '', '', '');
      try {
        await handler.handle(command);
      } catch (e) {
        expect(e.message).toEqual('UpdateACvCommandHandler - handler - error during handling command 181a146e-8c58-44c2-a828-1439b606e1e7: repository timeout requestId 181a146e-8c58-44c2-a828-1439b606e1e7');
      }
    });
  });
});
