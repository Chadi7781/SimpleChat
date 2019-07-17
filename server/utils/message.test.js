const expect = require('expect');

const {generateMessage} = require('./message');

describe('generatedMessage' , () => {
  it('should generate correct message object' , () =>{
    const from = 'chadi';
    const text = 'Some message';
    const message = generateMessage(from , text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from , text});
  });
});
