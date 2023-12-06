import { vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AsyncPopupProvider, BaseAsyncPopupProps, useAsyncPopupContext } from 'src'

type TestPopupProps = BaseAsyncPopupProps<boolean> & {
	text: string
}

const TestPopup = ({ onResolve, text }: TestPopupProps) => {
	return (
		<div>
			{text} <button onClick={() => onResolve(true)}>resolve {text}</button>
		</div>
	)
}

type TestComponentProps = {
	resolveP1Fn: (result: boolean) => void
	resolveP2Fn: (result: boolean) => void
}

const TestComponent = ({ resolveP1Fn, resolveP2Fn }: TestComponentProps) => {
	const showPopup = useAsyncPopupContext(TestPopup)

	const showPopup1 = () => {
		showPopup({ text: 'Popup 1' }).then(resolveP1Fn)
	}
	const showPopup2 = () => {
		showPopup({ text: 'Popup 2' }).then(resolveP2Fn)
	}

	return (
		<div>
			<button onClick={showPopup1}>Show Popup 1</button>
			<button onClick={showPopup2}>Show Popup 2</button>
		</div>
	)
}

describe('AsyncPopupProvider', () => {
	it('works as expected', async () => {
		const resolveP1Fn = vi.fn()
		const resolveP2Fn = vi.fn()
		const ui = render(
			<AsyncPopupProvider>
				<TestComponent
					resolveP1Fn={resolveP1Fn}
					resolveP2Fn={resolveP2Fn}
				/>
			</AsyncPopupProvider>,
		)

		expect(ui.queryByText('Popup 1')).not.toBeInTheDocument()
		expect(ui.queryByText('Popup 2')).not.toBeInTheDocument()

		await userEvent.click(ui.getByText('Show Popup 1'))
		expect(ui.getByText('Popup 1')).toBeInTheDocument()

		await userEvent.click(ui.getByText('Show Popup 2'))
		expect(ui.getByText('Popup 2')).toBeInTheDocument()

		await userEvent.click(ui.getByText('resolve Popup 1'))
		expect(resolveP1Fn).toHaveBeenCalledWith(true)

		await userEvent.click(ui.getByText('resolve Popup 2'))
		expect(resolveP2Fn).toHaveBeenCalledWith(true)
	})
})
