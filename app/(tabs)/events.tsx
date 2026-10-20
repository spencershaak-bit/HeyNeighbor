/*
 * Hey Neighbor — Events Tab
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
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadow } from '@/constants/theme';
import { mockEvents } from '@/services/mockData';
import { useAlert } from '@/template';

const CATEGORIES = ['All', 'Social', 'Fitness', 'Kids', 'Food', 'Community'];

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? mockEvents
    : mockEvents.filter(e => e.category === selectedCategory);

  const handlePlan = () => {
    showAlert(
      'Plan Something',
      'Event creation coming soon! You will be able to schedule neighborhood events and invite your neighbors.',
      [{ text: 'Got it', style: 'default' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Events</Text>
          <Text style={styles.headerSub}>Plans on the board</Text>
        </View>
        <Pressable style={styles.planBtn} onPress={handlePlan}>
          <MaterialIcons name="add" size={16} color={Colors.textInverse} />
          <Text style={styles.planBtnText}>Plan something</Text>
        </Pressable>
      </View>

      {/* Category Filter */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {CATEGORIES.map(cat => (
            <Pressable
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: event }) => (
          <Pressable style={styles.eventCard} onPress={() => router.push(`/event/${event.id}`)}>
            {event.coverImage ? (
              <Image
                source={{ uri: event.coverImage }}
                style={styles.eventImage}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={[styles.eventImage, styles.eventImagePlaceholder]}>
                <Text style={{ fontSize: 40 }}>🏡</Text>
              </View>
            )}
            <View style={styles.eventBody}>
              <View style={styles.eventTopRow}>
                <View style={[styles.catBadge, { backgroundColor: Colors.primarySurface }]}>
                  <Text style={[styles.catBadgeText, { color: Colors.primary }]}>{event.category}</Text>
                </View>
                {event.photos.length > 0 && (
                  <View style={styles.photosTag}>
                    <MaterialIcons name="photo-library" size={12} color={Colors.textMuted} />
                    <Text style={styles.photosTagText}>{event.photos.length} photos</Text>
                  </View>
                )}
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDesc} numberOfLines={2}>{event.description}</Text>

              <View style={styles.eventMetaRow}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="event" size={13} color={Colors.textMuted} />
                  <Text style={styles.metaText}>{event.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={13} color={Colors.textMuted} />
                  <Text style={styles.metaText}>{event.time}</Text>
                </View>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="place" size={13} color={Colors.textMuted} />
                <Text style={styles.metaText}>{event.location}</Text>
              </View>

              <View style={styles.eventFooter}>
                <View style={styles.hostRow}>
                  <MaterialIcons name="person" size={13} color={Colors.textMuted} />
                  <Text style={styles.hostText}>by {event.host}</Text>
                  <Text style={styles.attendeesText}>· {event.attendees} going</Text>
                </View>
                <Pressable style={[styles.rsvpBtn, event.rsvped && styles.rsvpBtnActive]}>
                  <Text style={[styles.rsvpBtnText, event.rsvped && styles.rsvpBtnTextActive]}>
                    {event.rsvped ? '✓ Going' : 'RSVP'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No events here yet</Text>
            <Text style={styles.emptyText}>Be the first to plan something in {selectedCategory}!</Text>
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
  planBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: Radius.round,
  },
  planBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  filterWrapper: {
    height: 52,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  chip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: Radius.round,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.textInverse,
    fontWeight: FontWeight.semibold,
  },
  listContent: {
    padding: Spacing.md,
    gap: 14,
    paddingBottom: 30,
  },
  eventCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.md,
  },
  eventImage: {
    width: '100%',
    height: 180,
  },
  eventImagePlaceholder: {
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventBody: {
    padding: Spacing.md,
  },
  eventTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  catBadge: {
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  catBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  photosTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photosTagText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  eventTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  eventDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  eventMetaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  metaText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hostText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  attendeesText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  rsvpBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.round,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  rsvpBtnActive: {
    backgroundColor: Colors.successSurface,
  },
  rsvpBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  rsvpBtnTextActive: {
    color: Colors.success,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
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
  },
});
