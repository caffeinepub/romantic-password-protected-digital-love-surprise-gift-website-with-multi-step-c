import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { GiftPage } from '../backend';
import type { GiftFormData } from '../types/gift';
import { encodeGiftData } from '../utils/giftDataEncoder';

export function useGetGiftPage(giftId: string, enabled: boolean = true) {
  const { actor, isFetching } = useActor();

  return useQuery<GiftPage>({
    queryKey: ['giftPage', giftId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getGiftPage(giftId);
    },
    enabled: !!actor && !isFetching && enabled && !!giftId,
  });
}

export function useCreateGift() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: GiftFormData) => {
      if (!actor) throw new Error('Actor not initialized');

      // Convert banner image to Uint8Array
      const bannerBuffer = await formData.bannerImage!.arrayBuffer();
      const bannerBlob = new Uint8Array(bannerBuffer);

      // Convert photos to collagePositions format
      const collagePositions: Array<[bigint, bigint, Uint8Array]> = [];
      for (let i = 0; i < formData.photos.length; i++) {
        const photoBuffer = await formData.photos[i].file.arrayBuffer();
        const photoBlob = new Uint8Array(photoBuffer);
        collagePositions.push([BigInt(i), BigInt(0), photoBlob]);
      }

      // Encode all data into tldr field
      const encodedData = encodeGiftData({
        partnerName: formData.partnerName,
        senderName: formData.senderName,
        email: formData.email,
        loveMessage: formData.loveMessage,
        endingMessage: formData.endingMessage,
        quizItems: formData.quizItems,
        hiddenMessages: formData.hiddenMessages,
        photoNotes: formData.photos.map((p) => p.note),
      });

      // Create main title
      const mainTitle = `For ${formData.partnerName} From ${formData.senderName}`;

      const giftId = await actor.saveGiftPage(
        encodedData,
        mainTitle,
        bannerBlob,
        formData.specialDate,
        collagePositions
      );

      return giftId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giftPages'] });
    },
  });
}
