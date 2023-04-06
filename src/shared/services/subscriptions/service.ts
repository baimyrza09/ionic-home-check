import { pipe, subscribe } from 'wonka';
import sdk from '@/app/graphql';
import { userStore } from '@/app/stores';

export async function listenClaim(claimId: number): Promise<any> {
  const store = userStore();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { unsubscribe } = pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await sdk.getClaimByIdForCourierSub({ claimId }),
    subscribe((result: any) => {
      const claim = result?.data.getClaimByIdForCourierSub;
      if (!claim) return;
      store.$patch({ claim: claim });
    })
  );

  return unsubscribe;
}
