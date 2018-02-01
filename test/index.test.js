import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import MemoryStorage from '../src/'

global.expect = chai.expect
chai.use(sinonChai)

describe('memory-storage', () => {
  let storage, callback
  beforeEach(() => {
    callback = sinon.spy()
  })

  describe('logger', () => {
    it('works', () => {
      const logger = sinon.spy()
      storage = new MemoryStorage({logger})
      storage.setItem('foo', 'bar')
      expect(logger).to.have.been.calledOnce
      expect(logger).to.have.been.calledWith('setItem called with', 'foo', 'bar')
    })
  })

  describe('initialState', () => {
    it('works', () => {
      const initialState = {a: 1, b: 2}
      storage = new MemoryStorage({ initialState })
      expect(storage.storage).to.deep.equal(initialState)
    })
  })

  describe('setItem', () => {
    beforeEach(() => storage = new MemoryStorage())

    it('works without a callback', async () => {
      const result = await storage.setItem('foo', 'bar')
      expect(result).to.equal('bar')
      expect(storage.storage.foo).to.equal('bar')
    })
    it('works with a callback', async () => {
      const result = await storage.setItem('foo', 'bar', callback)
      expect(result).to.equal('bar')
      expect(storage.storage.foo).to.equal('bar')
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(null, result)
    })
  })

  describe('getItem', () => {
    beforeEach(() => storage = new MemoryStorage({ initialState: { foo: 'bar'}}))
    it('works without a callback', async () => {
      const result = await storage.getItem('foo')
      expect(result).to.equal('bar')
    })
    it('works with a callback', async () => {
      const result = await storage.getItem('foo', callback)
      expect(result).to.equal('bar')
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(null, result)
    })
  })

  describe('removeItem', () => {
    beforeEach(() => storage = new MemoryStorage({ initialState: { foo: 'bar'}}))
    it('works without a callback', async () => {
      const result = await storage.removeItem('foo')
      expect(result).to.equal('bar')
      expect(storage.storage.foo).to.be.undefined
    })
    it('works with a callback', async () => {
      const result = await storage.removeItem('foo', callback)
      expect(result).to.equal('bar')
      expect(storage.storage.foo).to.be.undefined
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(null, result)
    })
  })
  describe('getAllKeys', () => {
    beforeEach(() => storage = new MemoryStorage({ initialState: { foo: 'bar', baz: 'bat'}}))
    it('works without a callback', async () => {
      const result = await storage.getAllKeys()
      expect(result).to.deep.equal(['foo', 'baz'])
    })
    it('works with a callback', async () => {
      const result = await storage.getAllKeys(callback)
      expect(result).to.deep.equal(['foo', 'baz'])
      expect(callback).to.have.been.calledOnce
      expect(callback).to.have.been.calledWith(null, result)
    })
  })
})
