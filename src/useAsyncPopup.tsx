import React from "react";

import { AnyComponent, AsyncPopupComponent, ShowAsyncPopupFn } from 'src/types'
import { createPopup } from './createPopup'

const EmptyPopup = () => <React.Fragment />

export const useAsyncPopup = <TComponent extends AnyComponent>(
	PopupComponent: AsyncPopupComponent<TComponent>,
): [React.ComponentType<{}>, ShowAsyncPopupFn<TComponent>] => {
	const [Popup, setPopup] = React.useState<React.ComponentType>(() => EmptyPopup)

	const showAsyncPopup: ShowAsyncPopupFn<TComponent> = (props) => {
		const onResolve = () => setPopup(() => EmptyPopup)

		const [NewPopup, promise] = createPopup<TComponent>({
			PopupComponent,
			componentProps: props,
			onResolve,
		})
		setPopup(() => NewPopup)

		return promise
	}

	return [Popup, showAsyncPopup]
}
