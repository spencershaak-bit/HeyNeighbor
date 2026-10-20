/*
 * Hey Neighbor — Village Kids Tab
 * Neighborhood care sharing: playdates, bus walks, rideshares, after-school
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
import { mockVillagePosts, VillageKidsPost } from '@/services/mockData';
import { useAlert } from '@/template';

const FILTERS: { key: VillageKidsPost['type'] | 'all'; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '🏘️' },
  { key: 'playdate', label: 'Playdates', emoji: '🎮' },
  { key: 'busWalk', label: 'Bus Walk', emoji: '🚌' },
  { key: 'rideshare', label: 'Rideshare', emoji: '🚗' },
  { key: 'afterSchool', label: 'After School', emoji: '🏫' },
];

const TYPE_COLORS: Record<string, string> = {
  playdate: Colors.purple,
  busWalk: Colors.secondary,
  rideshare: Colors.primary,
  afterSchool: Colors.accent,
};

const TYPE_SURFACE: Record<string, string> = {
  playdate: Colors.purpleSurface,
  busWalk: Colors.secondarySurface,
  rideshare: Colors.primarySurface,
  afterSchool: Colors.accentSurface,
};

const TYPE_LABELS: Record<string, string> = {
  playdate: '🎮 Playdate',
  busWalk: '🚌 Bus Walk',
  rideshare: '🚗 Rideshare',
  afterSchool: '🏫 After School',
};

export default function VillageScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [filter, setFilter] = useState<'all' | VillageKidsPost['type']>('all');
  const [posts, setPosts] = useState<VillageKidsPost[]>(mockVillagePosts);

  const filtered = filter === 'all' ? posts : posts.filter(p => p.type === filter);

  const handleRequest = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, requested: !p.requested } : p));
  };

  const handlePost = () => {
    showAlert(
      'Offer Your Help',
      'Village Kids posting is coming soon! You will be able to list playdates, bus walks, rideshares, and after-school hangouts for neighborhood families.',
      [{ text: 'Great!', style: 'default' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Village Kids 🧒</Text>
          <Text style={styles.headerSub}>It takes a village</Text>
        </View>
        <Pressable style={styles.offerBtn} onPress={handlePost}>
          <MaterialIcons name="add" size={16} color={Colors.textInverse} />
          <Text style={styles.offerBtnText}>Offer Help</Text>
        </Pressable>
      </View>

      {/* Explainer Banner */}
      <View style={styles.explainerBanner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=400&fit=crop' }}
          style={styles.explainerImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.explainerOverlay}>
          <Text style={styles.explainerTitle}>Trusted neighbors,{'\n'}helping families</Text>
          <Text style={styles.explainerSub}>
            Playdates, school pickups, bus stop walks, and carpools — organized safely right in your neighborhood.
          </Text>
          <View style={styles.explainerTags}>
            {['Background-friendly', 'Neighbor-verified', 'No apps fees'].map(t => (
              <View key={t} style={styles.explainerTag}>
                <Text style={styles.explainerTagText}>✓ {t}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Type Filter */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map(f => (
            <Pressable
              key={f.key}
              style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
              onPress={() => setFilter(f.key as any)}
            >
              <Text style={styles.filterEmoji}>{f.emoji}</Text>
              <Text style={[styles.filterLabel, filter === f.key && styles.filterLabelActive]}>
                {f.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Posts */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: post }) => (
          <VillageCard post={post} onRequest={handleRequest} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🧒</Text>
            <Text style={styles.emptyTitle}>No posts in this category</Text>
            <Text style={styles.emptyText}>Be the first neighbor to offer help!</Text>
            <Pressable style={styles.emptyBtn} onPress={handlePost}>
              <Text style={styles.emptyBtnText}>Offer your help</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

function VillageCard({ post, onRequest }: { post: VillageKidsPost; onRequest: (id: string) => void }) {
  const color = TYPE_COLORS[post.type] ?? Colors.text;
  const surface = TYPE_SURFACE[post.type] ?? Colors.background;
  const spotsLeft = post.spotsAvailable;
  const spotsFull = spotsLeft === 0;

  return (
    <View style={styles.card}>
      {/* Type Badge */}
      <View style={styles.cardTopRow}>
        <View style={[styles.typeBadge, { backgroundColor: surface }]}>
          <Text style={[styles.typeBadgeText, { color }]}>{TYPE_LABELS[post.type]}</Text>
        </View>
        <View style={styles.spotsRow}>
          {spotsFull ? (
            <View style={[styles.spotsBadge, { backgroundColor: Colors.errorSurface }]}>
              <Text style={[styles.spotsBadgeText, { color: Colors.error }]}>Full</Text>
            </View>
          ) : (
            <View style={[styles.spotsBadge, { backgroundColor: Colors.successSurface }]}>
              <Text style={[styles.spotsBadgeText, { color: Colors.success }]}>{spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left</Text>
            </View>
          )}
        </View>
      </View>

      {/* Host */}
      <View style={styles.hostRow}>
        <Image
          source={{ uri: post.hostAvatar }}
          style={styles.hostAvatar}
          contentFit="cover"
          transition={200}
        />
        <View>
          <Text style={styles.hostName}>{post.host}</Text>
          <Text style={styles.hostSub}>Neighbor host</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{post.title}</Text>
      <Text style={styles.cardDesc}>{post.description}</Text>

      {/* Details */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <MaterialIcons name="event" size={14} color={color} />
          <Text style={styles.detailText}>{post.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="schedule" size={14} color={color} />
          <Text style={styles.detailText}>{post.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="child-care" size={14} color={color} />
          <Text style={styles.detailText}>Ages {post.ageRange}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="group" size={14} color={color} />
          <Text style={styles.detailText}>{post.spotsAvailable}/{post.spotsTotal} available</Text>
        </View>
        {post.address && (
          <View style={styles.detailItem}>
            <MaterialIcons name="place" size={14} color={color} />
            <Text style={styles.detailText}>{post.address}</Text>
          </View>
        )}
        {post.route && (
          <View style={styles.detailItem}>
            <MaterialIcons name="alt-route" size={14} color={color} />
            <Text style={styles.detailText}>{post.route}</Text>
          </View>
        )}
      </View>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {post.tags.map(tag => (
          <View key={tag} style={[styles.tag, { backgroundColor: surface }]}>
            <Text style={[styles.tagText, { color }]}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Request Button */}
      <Pressable
        style={[
          styles.requestBtn,
          post.requested && styles.requestBtnActive,
          spotsFull && !post.requested && styles.requestBtnDisabled,
        ]}
        onPress={() => onRequest(post.id)}
        disabled={spotsFull && !post.requested}
      >
        <MaterialIcons
          name={post.requested ? 'check-circle' : 'waving-hand'}
          size={18}
          color={post.requested ? Colors.success : spotsFull ? Colors.textMuted : Colors.textInverse}
        />
        <Text style={[
          styles.requestBtnText,
          post.requested && styles.requestBtnTextActive,
          spotsFull && !post.requested && styles.requestBtnTextDisabled,
        ]}>
          {post.requested ? 'Request sent!' : spotsFull ? 'Full — check back soon' : 'Request a spot'}
        </Text>
      </Pressable>
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
  headerLeft: {},
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
  },
  headerSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
    fontStyle: 'italic',
  },
  offerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.purple,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: Radius.round,
  },
  offerBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  explainerBanner: {
    height: 180,
    margin: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  explainerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  explainerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(108,99,255,0.75)',
    padding: Spacing.md,
    justifyContent: 'flex-end',
  },
  explainerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: Colors.textInverse,
    lineHeight: 24,
    marginBottom: 4,
  },
  explainerSub: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
    marginBottom: 8,
  },
  explainerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  explainerTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.round,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  explainerTagText: {
    fontSize: FontSize.xs,
    color: Colors.textInverse,
    fontWeight: FontWeight.semibold,
  },
  filterWrapper: {
    height: 52,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
  filterEmoji: {
    fontSize: 14,
  },
  filterLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  filterLabelActive: {
    color: Colors.textInverse,
    fontWeight: FontWeight.semibold,
  },
  listContent: {
    padding: Spacing.md,
    gap: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.md,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  typeBadge: {
    borderRadius: Radius.round,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  typeBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.3,
  },
  spotsRow: {},
  spotsBadge: {
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  spotsBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  hostAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.borderLight,
  },
  hostName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  hostSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsGrid: {
    gap: 6,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  tag: {
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.purple,
    borderRadius: Radius.md,
    paddingVertical: 13,
  },
  requestBtnActive: {
    backgroundColor: Colors.successSurface,
    borderWidth: 1.5,
    borderColor: Colors.success,
  },
  requestBtnDisabled: {
    backgroundColor: Colors.borderLight,
  },
  requestBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  requestBtnTextActive: {
    color: Colors.success,
  },
  requestBtnTextDisabled: {
    color: Colors.textMuted,
  },
  empty: {
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
  emptyBtn: {
    backgroundColor: Colors.purple,
    borderRadius: Radius.md,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
  },
  emptyBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
});
