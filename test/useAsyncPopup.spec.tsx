import { vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useAsyncPopup, BaseAsyncPopupProps } from 'src'

const TestPopup = ({ onResolve }: BaseAsyncPopupProps<boolean>) => {
	return (
		<div>
			Test-Popup <button onClick={() => onResolve(true)}>resolve</button>
		</div>
	)
}

const TestComponent = ({ resolveFn }: { resolveFn: (ret: boolean) => unknown }) => {
	const [Popup, showPopup] = useAsyncPopup(TestPopup)

	return (
		<div>
			<Popup />
			<button onClick={() => showPopup({}).then(resolveFn)}>show popup</button>
		</div>
	)
}

describe('useAsyncPopup()', () => {
	it('works as expected', async () => {
		const resolveFn = vi.fn()

		const ui = render(<TestComponent resolveFn={resolveFn} />)

		expect(ui.queryByText('Test-Popup')).not.toBeInTheDocument()

		await userEvent.click(ui.getByText('show popup'))
		expect(ui.queryByText('Test-Popup')).toBeInTheDocument()

		await userEvent.click(ui.getByText('resolve'))
		expect(resolveFn).toHaveBeenCalledWith(true)
		expect(ui.queryByText('Test-Popup')).not.toBeInTheDocument()
	})
})
