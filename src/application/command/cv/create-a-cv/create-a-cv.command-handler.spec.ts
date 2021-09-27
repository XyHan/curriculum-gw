import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { CreateACvCommand } from './create-a-cv.command';
import { CreateACvCommandHandler } from './create-a-cv.command-handler';

describe('CreateACVCommandHandler tests', () => {
  describe('success', () => {
    it('Send CreateACVCommand in amqp bus', async () => {
      const publisherMock: PublisherInterface = {
        publish: jest.fn((command: CreateACvCommand) => {
          return new Promise(resolve => {
            setTimeout(() => { resolve(); }, 30);
          });
        }),
        close: jest.fn(),
      }
      const handler = new CreateACvCommandHandler(publisherMock);
      const command = new CreateACvCommand('181a146e-8c58-44c2-a828-1439b606e1e7', '47546f8f-67ba-478e-b948-a8fe2746de6e');
      const handledCommand = await handler.handle(command);
      expect(handledCommand.requestId).toEqual('181a146e-8c58-44c2-a828-1439b606e1e7');
    });
  });

  describe('error', () => {
    it('Amqp bus exception', async () => {
      const publisherMock: PublisherInterface = {
        publish: jest.fn((command: CreateACvCommand) => {
          return new Promise((resolve, reject) => {
            // simulate request delay
            setTimeout(() => reject(new Error(`repository timeout requestId ${command.requestId}`)), 20);
          });
        }),
        close: jest.fn(),
      }
      const handler = new CreateACvCommandHandler(publisherMock);
      const command = new CreateACvCommand('181a146e-8c58-44c2-a828-1439b606e1e7', '47546f8f-67ba-478e-b948-a8fe2746de6e');
      try {
        await handler.handle(command);
      } catch (e) {
        expect(e.message).toEqual('CreateACvCommandHandler - handler - error during handling command 181a146e-8c58-44c2-a828-1439b606e1e7: repository timeout requestId 181a146e-8c58-44c2-a828-1439b606e1e7');
      }
    });
  });
});
