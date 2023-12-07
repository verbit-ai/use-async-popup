import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import { createPopup } from './createPopup'
import {
	AnyComponent,
	AsyncPopupComponent,
	AsyncPopupProps,
	AsyncPopupPureProps,
	AsyncPopupReturnPromise,
	AsyncPopupBaseProps,
	ShowAsyncPopupFn,
} from './types'

type ShowPopupFn = <TComponent extends AnyComponent>(
	PopupComponent: AsyncPopupComponent<TComponent>,
	props: AsyncPopupPureProps<TComponent>,
) => AsyncPopupReturnPromise<AsyncPopupProps<TComponent>>

type AsyncPopupContextProps = {
	showPopup: ShowPopupFn
}

const Context = React.createContext<AsyncPopupContextProps | null>(null)

type AsyncPopupObj = {
	id: string
	Popup: React.ComponentType
}

type AsyncPopupProviderProps = {
	children?: React.ReactNode
}

export function AsyncPopupProvider({ children }: AsyncPopupProviderProps) {
	const [popups, setPopups] = useState<AsyncPopupObj[]>([])

	const showPopup: ShowPopupFn = (PopupComponent, props) => {
		const id = uuid()

		const onResolve = () => setPopups((popups) => popups.filter((p) => p.id !== id))

		const [Popup, promise] = createPopup({
			PopupComponent,
			componentProps: props,
			onResolve,
		})
		setPopups((popups) => popups.concat({ id, Popup }))

		return promise
	}

	return (
		<Context.Provider value={{ showPopup }}>
			{popups.map(({ id, Popup }) => (
				<Popup key={id} />
			))}
			{children}
		</Context.Provider>
	)
}

export function useAsyncPopupContext<TComponent extends AnyComponent>(
	PopupComponent: AsyncPopupComponent<TComponent>,
): ShowAsyncPopupFn<TComponent> {
	const ctx = useContext(Context)

	if (ctx === null) {
		throw new Error('useAsyncPopupContext() was not wrapped with an <AsyncPopupProvider />!')
	}

	return (props) => ctx.showPopup(PopupComponent, props)
}



