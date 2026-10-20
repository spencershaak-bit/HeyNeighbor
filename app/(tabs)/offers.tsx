/*
 * Hey Neighbor — Offers Tab
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadow } from '@/constants/theme';
import { mockOffers, LocalOffer } from '@/services/mockData';
import { useAlert } from '@/template';

export default function OffersScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [offers, setOffers] = useState<LocalOffer[]>(mockOffers);

  const handleSave = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
  };

  const handleAddOffer = () => {
    showAlert(
      'Add Your Offer',
      'Business listing costs $9.99 one-time. You will be able to add photos, a description, and a special deal for neighborhood residents. Coming soon!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Notify me when live', style: 'default' },
      ]
    );
  };

  const handleRedeem = (name: string) => {
    showAlert(
      'Redeem Offer',
      `Show this screen at ${name} and mention "Hey Neighbor" to redeem your neighbor discount!`,
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Local Offers</Text>
          <Text style={styles.headerSub}>Good things from local businesses</Text>
        </View>
        <Pressable style={styles.addBtn} onPress={handleAddOffer}>
          <MaterialIcons name="add" size={16} color={Colors.textInverse} />
          <Text style={styles.addBtnText}>Add offer</Text>
        </Pressable>
      </View>

      <FlatList
        data={offers}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.infoCard}>
            <MaterialIcons name="store" size={20} color={Colors.secondary} />
            <Text style={styles.infoText}>
              Real offers from nearby shops and services — not ads, just neighbors being useful.
            </Text>
          </View>
        }
        renderItem={({ item: offer }) => (
          <View style={styles.offerCard}>
            <View style={styles.offerTop}>
              <Image
                source={{ uri: offer.logo }}
                style={styles.offerLogo}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.offerInfo}>
                <View style={styles.offerTitleRow}>
                  <Text style={styles.offerBiz}>{offer.business}</Text>
                  <Pressable onPress={() => handleSave(offer.id)} hitSlop={10}>
                    <MaterialIcons
                      name={offer.saved ? 'bookmark' : 'bookmark-border'}
                      size={22}
                      color={offer.saved ? Colors.accent : Colors.textMuted}
                    />
                  </Pressable>
                </View>
                <View style={styles.categoryRow}>
                  <View style={styles.catBadge}>
                    <Text style={styles.catText}>{offer.category}</Text>
                  </View>
                  <View style={styles.distanceBadge}>
                    <MaterialIcons name="near-me" size={10} color={Colors.secondary} />
                    <Text style={styles.distanceText}>{offer.distance}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.dealBanner}>
              <MaterialIcons name="local-offer" size={18} color={Colors.accent} />
              <Text style={styles.dealText}>{offer.offer}</Text>
            </View>

            <Text style={styles.offerDesc}>{offer.description}</Text>

            <View style={styles.offerFooter}>
              <Text style={styles.validText}>Valid until {offer.validUntil}</Text>
              <Pressable style={styles.redeemBtn} onPress={() => handleRedeem(offer.business)}>
                <Text style={styles.redeemBtnText}>Redeem</Text>
                <MaterialIcons name="arrow-forward" size={14} color={Colors.textInverse} />
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.listingInfo}>
            <MaterialIcons name="info-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.listingText}>$9.99 one-time listing fee to post an offer</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>☕</Text>
            <Text style={styles.emptyTitle}>No offers yet</Text>
            <Text style={styles.emptyText}>
              Be the first local business to welcome the neighborhood.
            </Text>
            <Pressable style={styles.emptyBtn} onPress={handleAddOffer}>
              <Text style={styles.emptyBtnText}>Add an offer — $9.99</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: Radius.round,
  },
  addBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  listContent: {
    padding: Spacing.md,
    gap: 14,
    paddingBottom: 32,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.secondarySurface,
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.secondary + '40',
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.secondaryDark,
    lineHeight: 19,
  },
  offerCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.md,
  },
  offerTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  offerLogo: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    backgroundColor: Colors.borderLight,
  },
  offerInfo: {
    flex: 1,
  },
  offerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  offerBiz: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  catBadge: {
    backgroundColor: Colors.secondarySurface,
    borderRadius: Radius.round,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  catText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.secondary,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.background,
    borderRadius: Radius.round,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  distanceText: {
    fontSize: FontSize.xs,
    color: Colors.secondary,
    fontWeight: FontWeight.semibold,
  },
  dealBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.accentSurface,
    borderRadius: Radius.md,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.accentLight + '80',
  },
  dealText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.warning,
    flex: 1,
  },
  offerDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  offerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  validText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  redeemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.secondary,
    borderRadius: Radius.round,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  redeemBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  listingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  listingText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBtn: {
    backgroundColor: Colors.secondary,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  emptyBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
});
