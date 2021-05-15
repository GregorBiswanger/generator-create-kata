import <%= projectName %> from '../src/<%= srcPathName %>';

describe('<%= description %>', () => {
    it('Lorem ipsum dolor sit amet', () => {
        // Arrange
        const <%= variableName %> = new <%= projectName %>();

        // Act
        const result = <%= variableName %>.foobar();

        // Assert
        expect(result).toBeTruthy();
    });
});