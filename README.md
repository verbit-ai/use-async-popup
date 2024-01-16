# `use-async-popup`

`use-async-popup` is a lightweight and flexible React library designed to streamline the implementation of asynchronous pop-ups, modals, and dialogs in your applications. As developers, we often encounter scenarios where we need to prompt users for decisions, but managing the asynchronous nature of user interactions can be challenging. This library provides an intuitive and customizable solution to handle such cases effortlessly.

### Key Features
- **Easy Integration**: Seamlessly integrate asynchronous pop-ups into your React components with minimal setup.
- **Customizable UI**: Design pop-ups that match your application's look and feel using your preferred UI components or styles.
- **Versatile Usage**: Choose between a straightforward hook-based approach or a provider-based method, depending on your application's architecture and requirements.
- **Scalable Decisions**: Manage complex decision logic within your pop-ups, making it suitable for a wide range of scenarios.
- **Developer-Friendly**: Improve the developer experience by abstracting away the complexities of handling asynchronous user interactions.

## Installation

```bash
npm i use-async-popup
# or
yarn add use-async-popup
```

## Usage

There are 2 ways to use this library:

1. Use the `useAsyncPopup` Hook  
Utilize the `useAsyncPopup` hook to effortlessly integrate asynchronous pop-ups into your React components. This hook encapsulates the popup logic, providing a clean and convenient way to manage user decisions.

    ```ts
    import { useAsyncPopup, BaseAsyncPopupProps } from 'use-async-popup'

    type MyPopupProps = { title: string, message: string } & BaseAsyncPopupProps<boolean>

    function MyPopup({title, message, onResolve}: MyPopupProps) {
        const onClickYes = () => onResolve(true)
        const onClickNo = () => onResolve(false)

        return (
            <Modal>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <Actions>
                    <Button onClick={onClickYes}>Yes</Button>
                    <Button onClick={onClickNo}>No</Button>
                </Actions>
            <Modal>
        )
    }

    const useMyPopup = () => useAsyncPopup(MyPopup)


    // SomeComponent.ts

    function SomeComponent() {
        const [MyPopup, showMyPopup] = useMyPopup()

        const onMakeDecision = async () => {
            const decision = await showMyPopup({
                title: 'Is cereal a soup?',
                message: 'Remember, this decision might change your life.'
            })

            if(decision) {
                alert('wise choice!')
            }else {
                alert('Well, anyways')
            }
        }

        return (
            <div>
                <Button onClick={onMakeDecision}>Make decision</Button>
                <MyPopup />
            </div>
        )
    }
    ```

2. Use the `<AsyncPopupProvider />`.  
Opt for the <AsyncPopupProvider /> when dealing with scenarios where pop-ups are part of complex decision logic or when prop-drilling is not straightforward.

    ```ts
    import { useAsyncPopupContext, BaseAsyncPopupProps } from 'use-async-popup'

    type MyPopupProps = { title: string, message: string } & BaseAsyncPopupProps<string>;

    function MyPopup({ title, message, onResolve }: MyPopupProps) {
        const onOptionSelected = (option: string) => () => onResolve(option);

        return (
            <Modal>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <Actions>
                    <Button onClick={onOptionSelected('Option 1')}>Option 1</Button>
                    <Button onClick={onOptionSelected('Option 2')}>Option 2</Button>
                    <Button onClick={onOptionSelected('Option 3')}>Option 3</Button>
                </Actions>
            </Modal>
        );
    }

    const useMyPopup = () => useAsyncPopupContext(MyPopup);

    // someHeavyHook.ts

    function useMyHeavyDecisionLogic() {
        const showMyPopup = useMyPopup();

        return async () => {
            const selectedOption = await showMyPopup({
                title: 'Choose an Option',
                message: 'This decision might influence your journey.',
            });

            alert(`You selected: ${selectedOption}`);
        };
    }

    // SomeComponent.ts

    import { AsyncPopupProvider } from 'use-async-popup';

    function SomeComponent() {
        const makeDecision = useMyHeavyDecisionLogic();

        const onMakeDecision = () => makeDecision();

        return (
            <Button onClick={onMakeDecision}>Make Decision</Button>
        );
    }

    ReactDOM.render(
        <AsyncPopupProvider>
            <SomeComponent />
        </AsyncPopupProvider>,
        document.getElementById('root')
    );
    ```

## Contribution

We welcome contributions! If you find a bug, have a feature request, or would like to contribute code, please follow our [contribution guidelines](/CONTRIBUTING.md).