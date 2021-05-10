var expect = chai.expect;
describe('index.js', function() {
    describe('Card', function() {
        describe('#cardValue', function() {


            it('should return an numeric value of 2', function() {
                expect(new Card('Hearts', '2').cardValue()).to.be.equal(2);
            })

            it('should return an numeric value of 13', function() {
                expect(new Card('Spades', 'K').cardValue()).to.be.equal(13);
            })
            
        })
    })
})
describe('')