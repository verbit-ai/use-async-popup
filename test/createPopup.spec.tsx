import { vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BaseAsyncPopupProps } from 'src'
import { createPopup } from 'src/createPopup'

const TestPopup = ({ onResolve }: BaseAsyncPopupProps<boolean>) => {
	return (
		<div>
			Test-Popup <button onClick={() => onResolve(true)}>resolve true</button>
		</div>
	)
}

describe('createPopup()', () => {
	it('works as expected', async () => {
		const [Popup, promise] = createPopup({
			PopupComponent: TestPopup,
			componentProps: {},
		})
		const resolveFn = vi.fn()
		promise.then(resolveFn)

		const ui = render(<Popup />)

		expect(ui.getByText('Test-Popup')).toBeInTheDocument()

		await userEvent.click(ui.getByText('resolve true'))
		expect(resolveFn).toHaveBeenCalledWith(true)
	})
})
