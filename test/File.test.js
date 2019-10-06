const File = artifacts.require("File");
require('chai')
.use(require('chai-as-promised'))
.should()

contract('File',(accounts)=>{
    //test
    let file
    before(async()=>{
        file = await File.deployed()
    })
    describe('deployment',async()=>{
        it('deploy successfully',async() =>{
           
        const address = file.address
        //console.log(address)
        assert.notEqual(address, '0x0')
        assert.notEqual(address, '')
        assert.notEqual(address, 'null')
        assert.notEqual(address, 'undefined')
        })
    })
    describe('storage', async() =>{
        it('updates the fileHash',async()=>{
            
          let fileHash = 'abc123'
          await file.set(fileHash)
          const result = await file.get()
          assert.equal(result, fileHash)

        })
    })
})