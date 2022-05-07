const { assert } = require("chai")

const TodoList = artifacts.require('./TodoList.sol')

//Here we will write all the test cases.
//Its a callback function that will expose all the accounts so that we can utilise those in test cases.
contract('TodoList', (account) => {
    // before each test runs, we will have copy of todoList that is deployed on the blockchain
    before(async () => {
        this.todoList = await TodoList.deployed()
    })

    // First test where we are displaying message "deploys successfully" when we are getting proper address from the blockchain.
    it('deploys successfully', async () =>{
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    }),

    //Test to list out the tasks and validate them
    it('Lists Tasks', async () => {
 
        const taskCount = await this.todoList.tasksCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'Check Out Boogie')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)
    })

})