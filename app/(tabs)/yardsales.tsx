/*
 * Hey Neighbor — Yard Sales Tab
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadow } from '@/constants/theme';
import { mockYardSales, YardSale } from '@/services/mockData';
import { useAlert } from '@/template';

export default function YardSalesScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [sales, setSales] = useState<YardSale[]>(mockYardSales);

  const handleSave = (id: string) => {
    setSales(prev => prev.map(s => s.id === id ? { ...s, saved: !s.saved } : s));
  };

  const handlePost = () => {
    showAlert(
      'Post a Yard Sale',
      'Yard sale posting is coming soon! You will be able to list your sale with photos, categories, and item highlights.',
      [{ text: 'Got it', style: 'default' }]
    );
  };

  const handleDirections = (address: string) => {
    showAlert(
      'Get Directions',
      `Opening directions to ${address}...`,
      [{ text: 'Got it', style: 'default' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Yard Sales 🏷️</Text>
          <Text style={styles.headerSub}>{sales.length} sales near you</Text>
        </View>
        <Pressable style={styles.postBtn} onPress={handlePost}>
          <MaterialIcons name="add" size={16} color={Colors.textInverse} />
          <Text style={styles.postBtnText}>Post Sale</Text>
        </Pressable>
      </View>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=400&fit=crop' }}
          style={styles.heroImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.heroTextOverlay}>
          <Text style={styles.heroTitle}>Treasure hunting{'\n'}starts here</Text>
          <Text style={styles.heroSub}>Real finds from real neighbors. No shipping required.</Text>
        </View>
      </View>

      {/* Sales List */}
      <FlatList
        data={sales}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: sale }) => (
          <View style={styles.saleCard}>
            {/* Photos */}
            {sale.photos.length > 0 && (
              <View style={styles.salePhotoRow}>
                <Image
                  source={{ uri: sale.photos[0] }}
                  style={[styles.salePhotoMain, sale.photos.length > 1 && styles.salePhotoMainSmaller]}
                  contentFit="cover"
                  transition={200}
                />
                {sale.photos[1] && (
                  <Image
                    source={{ uri: sale.photos[1] }}
                    style={styles.salePhotoSecondary}
                    contentFit="cover"
                    transition={200}
                  />
                )}
              </View>
            )}

            <View style={styles.saleBody}>
              {/* Top row */}
              <View style={styles.saleTitleRow}>
                <Text style={styles.saleHost}>{sale.host}</Text>
                <Pressable onPress={() => handleSave(sale.id)} hitSlop={10}>
                  <MaterialIcons
                    name={sale.saved ? 'bookmark' : 'bookmark-border'}
                    size={22}
                    color={sale.saved ? Colors.accent : Colors.textMuted}
                  />
                </Pressable>
              </View>

              {/* Address + Distance */}
              <View style={styles.locationRow}>
                <MaterialIcons name="place" size={14} color={Colors.primary} />
                <Text style={styles.saleAddress}>{sale.address}</Text>
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>{sale.distance}</Text>
                </View>
              </View>

              {/* Date/Time */}
              <View style={styles.dateRow}>
                <MaterialIcons name="event" size={14} color={Colors.textMuted} />
                <Text style={styles.saleDate}>{sale.date}</Text>
                <MaterialIcons name="schedule" size={14} color={Colors.textMuted} />
                <Text style={styles.saleDate}>{sale.time}</Text>
              </View>

              <Text style={styles.saleDesc} numberOfLines={2}>{sale.description}</Text>

              {/* Categories */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tagsRow}
              >
                {sale.categories.map(cat => (
                  <View key={cat} style={styles.tag}>
                    <Text style={styles.tagText}>{cat}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Highlights */}
              <View style={styles.highlightsSection}>
                <Text style={styles.highlightsTitle}>✨ Highlights</Text>
                <View style={styles.highlightsList}>
                  {sale.highlights.map(h => (
                    <View key={h} style={styles.highlightItem}>
                      <MaterialIcons name="star" size={12} color={Colors.accent} />
                      <Text style={styles.highlightText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Actions */}
              <View style={styles.saleActions}>
                <Pressable style={styles.directionsBtn} onPress={() => handleDirections(sale.address)}>
                  <MaterialIcons name="directions" size={16} color={Colors.primary} />
                  <Text style={styles.directionsBtnText}>Directions</Text>
                </Pressable>
                <Pressable style={styles.notifyBtn}>
                  <MaterialIcons name="notifications-none" size={16} color={Colors.textSecondary} />
                  <Text style={styles.notifyBtnText}>Remind me</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
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
  postBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: Radius.round,
  },
  postBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  heroCard: {
    height: 140,
    margin: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroTextOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28,25,23,0.5)',
    padding: Spacing.md,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textInverse,
    lineHeight: 26,
  },
  heroSub: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
  },
  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 32,
    gap: 16,
  },
  saleCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.md,
  },
  salePhotoRow: {
    flexDirection: 'row',
    height: 160,
  },
  salePhotoMain: {
    flex: 1,
    height: 160,
  },
  salePhotoMainSmaller: {
    flex: 2,
  },
  salePhotoSecondary: {
    flex: 1,
    height: 160,
    marginLeft: 2,
  },
  saleBody: {
    padding: Spacing.md,
  },
  saleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  saleHost: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  saleAddress: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  distanceBadge: {
    backgroundColor: Colors.accentSurface,
    borderRadius: Radius.round,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  distanceText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.accent,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  saleDate: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  saleDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: Colors.accentSurface,
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.accentLight,
  },
  tagText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.warning,
  },
  highlightsSection: {
    backgroundColor: Colors.accentSurface,
    borderRadius: Radius.md,
    padding: 10,
    marginBottom: 12,
  },
  highlightsTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.warning,
    marginBottom: 6,
  },
  highlightsList: {
    gap: 4,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  highlightText: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  saleActions: {
    flexDirection: 'row',
    gap: 10,
  },
  directionsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 10,
  },
  directionsBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  notifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  notifyBtnText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
