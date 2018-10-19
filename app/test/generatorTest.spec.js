
const test = require('japa');
const path = require('path')
import BaseGenerator from "../bin/BaseGenerator"

test.group('Generator', (group)=>{
  group.beforeEach(()=>{
    
  })

  test('throw exception when file already exists', async (assert) => {
    assert.plan(1)
    const gen = new BaseGenerator()
    await gen.generateFile(path.join(__dirname, 'sample.js'), `module.exports = '{{ name }}'`, { name: 'virk' })

    try {
      await gen.generateFile(path.join(__dirname, 'sample.js'), `module.exports = '{{ name }}'`, { name: 'virk' })
    } catch ({ message }) {
      assert.match(message, /already exists/)
    }

    await gen.removeFile(path.join(__dirname, 'sample.js'))
  })
  
}) 

