import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageCompose } from '../component/MessageCompose';

describe('<MessageCompose />', () => {
    test('rendered?', () => {
        render(<MessageCompose onNewMessage={() => {}} />)
    }) 

    test('input Button is available', () => {
        render(<MessageCompose onNewMessage={() => {}} />)

        screen.getByRole('button');
    })

    test('test when typing message is in the textbox', () => {
        render(<MessageCompose onNewMessage={() => {}} />)

        const textbox = screen.getByRole('textbox');
        userEvent.type(textbox, 'Hello world!');

        expect(textbox).toHaveValue('Hello world!');
    })

    test('test submit and callback', () => {
        const handleOnNewMessage = jest.fn();
        render(<MessageCompose onNewMessage={handleOnNewMessage} />)

        const textbox = screen.getByRole('textbox');
        userEvent.type(textbox, 'Hello world!');
        const button = screen.getByRole('button');
        userEvent.click(button);

        expect(handleOnNewMessage).toHaveBeenCalledTimes(1);
        expect(handleOnNewMessage).toHaveBeenCalledWith('Hello world!');
    })

    test('test submit by pressing enter', () => {
        const handleOnNewMessage = jest.fn();
        render(<MessageCompose onNewMessage={handleOnNewMessage} />)

        const textbox = screen.getByRole('textbox');
        userEvent.type(textbox, 'Hello world!{enter}');
        expect(handleOnNewMessage).toHaveBeenCalledTimes(1);
        expect(handleOnNewMessage).toHaveBeenCalledWith('Hello world!');
    })
})