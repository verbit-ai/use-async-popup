export type AsyncPopupResolveFn<TReturn> = (result: TReturn) => unknown;

export type BaseAsyncPopupProps<TReturn> = {
	onResolve: AsyncPopupResolveFn<TReturn>;
};

export type ResolveRef<TReturn> = React.MutableRefObject<
	(result: TReturn) => void
>;

export type AsyncPopupComponent = React.ComponentType<BaseAsyncPopupProps<any>>;

export type ShowAsyncPopupFn<TComponent extends AsyncPopupComponent> = (
	props: AsyncPopupComponentPureProps<TComponent>
) => AsyncPopupReturnPromise<TComponent>;

export type AsyncPopupComponentReturnType<
	TComponent extends AsyncPopupComponent
> = React.ComponentProps<TComponent> extends BaseAsyncPopupProps<infer TReturn>
	? TReturn
	: never;

export type AsyncPopupReturnPromise<TComponent extends AsyncPopupComponent> =
	Promise<AsyncPopupComponentReturnType<TComponent>>;

export type AsyncPopupComponentPureProps<
	TComponent extends AsyncPopupComponent
> = Omit<React.ComponentProps<TComponent>, keyof BaseAsyncPopupProps<any>>;
